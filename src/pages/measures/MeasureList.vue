<template>
<QPage class="q-pa-sm">
  <QCard
    bordered
    class="q-my-sm"
    flat
  >
    <QForm
      ref="form"
      @submit="handleSubmit"
    >
      <QCardSection>
        <div class="text-h6 text-capitalize">{{ status }} unidades</div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <QInput
          v-model="measure.description"
          label="Descripcion"
          lazy-rules
          outlined
          :readonly="status === 'detalle'"
          :rules="[ val => val && val.length > 0 || 'Porfavor ingrese una descripcion']"
        />
      </QCardSection>

      <QCardActions align="right">
        <QBtn
          v-if="status === 'crear'"
          color="primary"
          flat
          label="Guardar"
          type="submit"
        />
        <QBtn
          v-if="status === 'editar'"
          color="primary"
          flat
          label="Actualizar"
          type="submit"
        />
        <QBtn
          v-if="status === 'detalle'"
          color="secondary"
          flat
          label="Cerrar detalle"
          type="submit"
        />
      </QCardActions>
    </QForm>
  </QCard>
  <QCard
    bordered
    class="q-pa-sm"
    flat
  >
    <QCardSection>
      <QTable
        :columns="columns"
        flat
        row-key="name"
        :rows="measures"
      >
        <template #body="props">
          <QTr :props="props">
            <QTd
              key="id"
              :props="props">{{ props.row.id }}</QTd>
            <QTd
              key="description"
              :props="props">{{ props.row.description }}</QTd>
            <QTd auto-width>
              <QBtn
                dense
                flat
                icon="more_vert"
                round
                @click.stop
              >
                <QMenu>
                  <QList style="min-width: 200px">
                    <QItem
                      v-close-popup
                      clickable
                      @click="() => {
                        measure = {...props.row},
                        status = 'detalle'
                      }"
                    >
                      <QItemSection side>
                        <QIcon
                          color="secondary"
                          name="remove_red_eye"
                        />
                      </QItemSection>
                      <QItemSection>Detalle</QItemSection>
                    </QItem>
                    <QItem
                      v-close-popup
                      clickable
                      @click="() => {
                        measure = {...props.row},
                        status = 'editar'
                      }"
                    >
                      <QItemSection side>
                        <QIcon
                          color="secondary"
                          name="create"
                        />
                      </QItemSection>
                      <QItemSection>Editar</QItemSection>
                    </QItem>
                    <QItem
                      v-close-popup
                      clickable
                      @click="() => {
                        measure = {...props.row},
                        handleDelete(props.row)
                      }"
                    >
                      <QItemSection side>
                        <QIcon
                          color="red"
                          name="delete"
                        />
                      </QItemSection>
                      <QItemSection>Eliminar</QItemSection>
                    </QItem>

                  </QList>
                </QMenu>
              </QBtn>
            </QTd>
          </QTr>
        </template>
      </QTable>
    </QCardSection>
  </QCard>
</QPage>
</template>

<script>
import { api } from 'src/boot/axios'

const columns = [
  {
    name: 'id',
    label: 'Codigo',
    align: 'left',
    field: row => row.id
  },
  {
    name: 'description',
    label: 'Descripcion',
    align: 'left',
    field: row => row.description
  },
  {}
]

const measure = {
  id: '',
  description: ''
}

export default {
  name: 'MeasuresList',
  data () {
    return {
      measures: [],
      columns,
      status: 'crear',
      measure: { ...measure }
    }
  },
  created () {
    this.handleGetMeasures()
  },
  methods: {
    async handleGetMeasures () {
      const res = await api.get('/producto/MeasureUnit/')
      this.measures = res.data
    },
    async handleView () {},
    async handleCreate () {
      try {
        await api.post('/producto/MeasureUnit/', this.measure)
        await this.handleGetMeasures()
        this.$q.notify({
          type: 'positive',
          message: 'Se ha creado correctamente!'
        })
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Ocurrió un error al guardar registro!'
        })
      }
    },
    async handleEdit () {
      try {
        await api.put(`/producto/MeasureUnit/${this.measure.id}/`, this.measure)
        await this.handleGetMeasures()
        this.$q.notify({
          type: 'positive',
          message: 'Se ha editado correctamente!'
        })
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Ocurrió un error al editar registro!'
        })
      }
    },
    async handleDelete () {
      this.$q.dialog({
        title: 'Esta seguro que desea eliminar ?',
        message: this.measure.description
      }).onOk(async () => {
        try {
          await api.delete(`/producto/MeasureUnit/${this.measure.id}/`)
          await this.handleGetMeasures()
          this.$q.notify({
            type: 'positive',
            message: 'Se ha eliminado correctamente!'
          })
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al eliminar registro!'
          })
        } finally {
          this.handleResetForm()
        }
      })
    },
    async handleSubmit () {
      if (this.status === 'crear') {
        await this.handleCreate()
      }
      if (this.status === 'editar') {
        await this.handleEdit()
        this.status = 'crear'
      }
      if (this.status === 'detalle') {
        this.status = 'crear'
      }
      this.handleResetForm()
    },
    handleResetForm () {
      this.measure = measure
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
