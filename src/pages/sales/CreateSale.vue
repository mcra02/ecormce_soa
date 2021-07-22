<template>
<QPage class="q-pa-sm">
  <QCard
    bordered
    class="q-pa-sm"
    flat
  >
    <QCardSection class="text-h6">
      Productos disponibles
    </QCardSection>
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
                color="primary"
                :disabled="selectedProducts.includes(props.row)"
                icon="shopping_cart"
                round
                @click="selectedProducts.push(props.row)"
              />
            </QTd>
          </QTr>
        </template>
      </QTable>
    </QCardSection>
  </QCard>
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
        <div class="text-h6 text-capitalize">Venta</div>
      </QCardSection>

      <QCardSection class="q-pt-none row">
        <div class="col-12 q-px-sm">
          <QSelect
            v-model="sale.client"
            emit-value
            label="Cliente"
            map-options
            option-label="name"
            option-value="id"
            :options="optionsClients"
            outlined
          />
        </div>
      </QCardSection>

      <QCardSection>
        <QTable
          :columns="columnsCar"
          flat
          row-key="name"
          :rows="selectedProducts"
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
              <QTd
                key="quantity"
                :props="props">
                {{ props.row.quantity }}
                <QPopupEdit v-model="props.row.quantity">
                  <QInput
                    v-model="props.row.quantity"
                    autofocus
                    counter
                    dense />
                </QPopupEdit>
              </QTd>
              <QTd auto-width>
                <QBtn
                  color="red"
                  icon="close"
                  round
                  @click="handleRemoveCar(props.row)"
                />
              </QTd>
            </QTr>
          </template>
        </QTable>
      </QCardSection>

      <QCardActions align="right">
        <QBtn
          color="secondary"
          label="Cancelar"
          @click="handleCancel"
        />
        <QBtn
          color="primary"
          flat
          label="Guardar"
          type="submit"
        />
      </QCardActions>
    </QForm>
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

const columnsCar = [
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
  {
    name: 'quantity',
    label: 'Cantidad',
    align: 'left'
  },
  {}
]

const sale = {
  detalles: [],
  state: true,
  total_price: 0,
  client: null,
  user: null
}

export default {
  name: 'CreateSale',
  data () {
    return {
      columns,
      columnsCar,
      products: [],
      selectedProducts: [],
      sale: { ...sale },
      optionsClients: [],
      user: null
    }
  },
  created () {
    this.handleGetProducts()
    this.handleGetClients()
    // this.user = JSON.parse(JSON.stringify(localStorage.getItem('user_soa')))
    this.user = JSON.parse(localStorage.getItem('user_soa'))
  },
  methods: {
    async handleGetProducts () {
      const res = await api.get('/producto/Products/')
      this.products = res.data
    },
    async handleGetClients () {
      const res = await api.get('/cliente/Clients/')
      this.optionsClients = res.data
    },
    async handleSubmit () {
      const formData = { ...this.sale }
      console.warn(formData, this.user)
      this.selectedProducts.forEach(i => {
        formData.detalles.push({
          cantidad: Number(i.quantity),
          precio: 0,
          sale: 0,
          product_id: i.id
        })
      })
      formData.user = this.user.id
      await api.post('/venta/Sales/', formData)
    },
    handleRemoveCar (val) {
      const index = this.selectedProducts.findIndex(v => v.id === val.id)
      if (index >= 0) {
        this.selectedProducts.splice(index, 1)
      }
    },
    handleCancel () {
      this.$router.push({ name: 'sales' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
