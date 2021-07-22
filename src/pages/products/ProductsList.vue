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
            v-model="product.name"
            label="Nombre"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val.length > 0 || 'Porfavor ingrese nombre']"
          />
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="product.stock"
            label="Stock"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val > 0 || 'Porfavor ingrese el stock']"
            type="number"
          />
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="product.price"
            label="Precio"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val > 0 || 'Porfavor ingrese un precio']"
            type="number"
          />
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="product.brand"
            label="Marca"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
            :rules="[ val => val && val.length > 0 || 'Porfavor ingrese una marca']"
          />
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QInput
            v-model="product.type"
            label="Tipo"
            lazy-rules
            outlined
            :readonly="status === 'detalle'"
          />
          <!-- :rules="[ val => val && val.length > 0 || 'Porfavor ingrese un tipo']" -->
        </div>
        <div class="col-12 col-md-6 q-px-sm">
          <QSelect
            v-model="product.measure_unit"
            emit-value
            label="Unidades"
            map-options
            option-label="description"
            option-value="id"
            :options="optionsMeasure"
            outlined
            :readonly="status === 'detalle'"
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
        :rows="products"
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
              key="stock"
              :props="props">{{ props.row.stock }}</QTd>
            <QTd
              key="price"
              :props="props">{{ props.row.price }}</QTd>
            <QTd
              key="brand"
              :props="props">{{ props.row.brand }}</QTd>
            <QTd
              key="type"
              :props="props">{{ props.row.type }}</QTd>
            <QTd
              key="measure_unit"
              :props="props">{{ props.row.measure_unit }}</QTd>
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
                        product = {...props.row},
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
                        product = {...props.row},
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
                        product = {...props.row},
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
    name: 'stock',
    label: 'Stock',
    align: 'left',
    field: row => row.name
  },
  {
    name: 'price',
    label: 'Price',
    align: 'left',
    field: row => row.name
  },
  {
    name: 'brand',
    label: 'Brand',
    align: 'left',
    field: row => row.name
  },
  {
    name: 'type',
    label: 'Tipo',
    align: 'left',
    field: row => row.name
  },
  {
    name: 'measure_unit',
    label: 'Unidad',
    align: 'left',
    field: row => row.name
  },
  {}
]

const product = {
  id: null,
  name: '',
  stock: null,
  price: null,
  brand: '',
  type: '',
  measure_unit: null
}

export default {
  name: 'ProductsList',
  data () {
    return {
      products: [],
      columns,
      status: 'crear',
      product: { ...product },
      optionsMeasure: []
    }
  },
  created () {
    this.handleGetProducts()
    this.handleGetMeasures()
  },
  methods: {
    async handleGetMeasures () {
      const res = await api.get('/producto/MeasureUnit/')
      this.optionsMeasure = res.data
    },
    async handleGetProducts () {
      const res = await api.get('/producto/Products/')
      this.products = res.data
    },
    async handleView () {},
    async handleCreate () {
      try {
        await api.post('/producto/Products/', this.product)
        await this.handleGetProducts()
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
        await api.put(`/producto/Products/${this.product.id}/`, this.product)
        await this.handleGetProducts()
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
        message: this.product.name
      }).onOk(async () => {
        try {
          await api.delete(`/producto/Products/${this.product.id}/`)
          await this.handleGetProducts()
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
      this.product = product
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
