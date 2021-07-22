<template>
<QPage class="q-pa-sm">
  <QCard
    bordered
    class="q-my-sm"
    flat
  >

    <QCardSection>
      <div class="text-h6 text-capitalize">{{ status }} ventas</div>
    </QCardSection>

    <QCardActions align="left">
      <QBtn
        v-if="status === 'crear'"
        color="primary"
        label="Crear venta"
        @click="handleCreateSale"
      />
    </QCardActions>
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
        :rows="sales"
      >
        <template #body="props">
          <QTr :props="props">
            <QTd
              key="id"
              :props="props">{{ props.row.id }}</QTd>
            <QTd
              key="client"
              :props="props">{{ props.row.client }}</QTd>
            <QTd
              key="user"
              :props="props">{{ props.row.user }}</QTd>
            <QTd
              key="date"
              :props="props">{{ props.row.date }}</QTd>
            <QTd
              key="total_price"
              :props="props">{{ props.row.total_price }}</QTd>
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
                        sale = {...props.row},
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
                        sale = {...props.row},
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
                        sale = {...props.row},
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
    name: 'client',
    label: 'Cliente',
    align: 'left',
    field: row => row.client
  },
  {
    name: 'user',
    label: 'Usuario',
    align: 'left',
    field: row => row.user
  },
  {
    name: 'date',
    label: 'Fecha',
    align: 'left',
    field: row => row.date
  },
  {
    name: 'total_price',
    label: 'Precio Total',
    align: 'left',
    field: row => row.total_price
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
  name: 'SalesList',
  data () {
    return {
      sales: [],
      columns,
      status: 'crear',
      sale: { ...sale },
      optionsMeasure: []
    }
  },
  created () {
    this.handleGetSales()
  },
  methods: {
    async handleGetSales () {
      const res = await api.get('/venta/Sales/')
      this.sales = res.data
    },
    async handleView () {},
    async handleDelete () {
      this.$q.dialog({
        title: 'Esta seguro que desea eliminar ?',
        message: this.sale.name
      }).onOk(async () => {
        try {
          await api.delete(`/venta/Sales/${this.sale.id}/`)
          await this.handleGetSales()
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
    handleResetForm () {
      this.sale = sale
      this.$refs.form.resetValidation()
    },
    handleCreateSale () {
      this.$router.push({ name: 'salesCreate' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
