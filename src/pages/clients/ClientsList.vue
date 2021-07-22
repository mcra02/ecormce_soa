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

      <QCardSection class="q-pt-none row">
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="client.dni"
            label="DNI"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val > 100000 || 'Porfavor ingrese dni']"
            type="number"
          />
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="client.name"
            label="Nombre"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val.length > 0 || 'Porfavor ingrese el nombre']"
          />
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="client.last_name"
            label="Apellidos"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val.length > 0 || 'Porfavor ingrese un apellidos']"
          />
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="client.direction"
            label="Direccion"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val.length > 0 || 'Porfavor ingrese una direccion']"
          />
        </div>
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
        :rows="clients"
      >
        <template #body="props">
          <QTr :props="props">
            <QTd
              key="id"
              :props="props">{{ props.row.id }}</QTd>
            <QTd
              key="name"
              :props="props">{{ props.row.name }}</QTd>
            <QTd
              key="last_name"
              :props="props">{{ props.row.last_name }}</QTd>
            <QTd
              key="dni"
              :props="props">{{ props.row.dni }}</QTd>
            <QTd
              key="direction"
              :props="props">{{ props.row.direction }}</QTd>
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
                        client = {...props.row},
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
                        client = {...props.row},
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
                        client = {...props.row},
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
    name: 'name',
    label: 'Nombre',
    align: 'left',
    field: row => row.name
  },
  {
    name: 'last_name',
    label: 'Apellidos',
    align: 'left',
    field: row => row.name
  },
  {
    name: 'dni',
    label: 'DNI',
    align: 'left',
    field: row => row.name
  },
  {
    name: 'direction',
    label: 'Direccion',
    align: 'left',
    field: row => row.name
  },
  {}
]

const client = {
  id: null,
  dni: '',
  name: '',
  last_name: '',
  direction: ''
}

export default {
  name: 'ClientsList',
  data () {
    return {
      clients: [],
      columns,
      status: 'crear',
      client: { ...client },
      optionsMeasure: []
    }
  },
  created () {
    this.handleGetClients()
  },
  methods: {
    async handleGetClients () {
      const res = await api.get('/cliente/Clients/')
      this.clients = res.data
    },
    async handleView () {},
    async handleCreate () {
      try {
        await api.post('/cliente/Clients/', this.client)
        await this.handleGetClients()
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
        await api.put(`/cliente/Clients/${this.client.id}/`, this.client)
        await this.handleGetClients()
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
        message: this.client.name
      }).onOk(async () => {
        try {
          await api.delete(`/cliente/Clients/${this.client.id}/`)
          await this.handleGetClients()
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
      this.client = client
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
