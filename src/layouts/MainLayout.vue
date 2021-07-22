<template>
<QLayout view="hHh Lpr fFf">
  <!-- view="lHh Lpr lFf" -->
  <QHeader elevated>
    <QToolbar>
      <QBtn
        aria-label="Menu"
        dense
        flat
        icon="menu"
        round
        @click="toggleLeftDrawer"
      />

      <QToolbarTitle>
        ECOMERCE SOA
      </QToolbarTitle>

      <div>
        <QBtn
          color="secondary"
          label="Cerrar session"
          outlined
          @click="handleCloseSession"
        />
      </div>
    </QToolbar>
  </QHeader>

  <QDrawer
    v-model="leftDrawerOpen"
    bordered
    class="bg-grey-1"
    show-if-above
  >
    <QList>
      <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
    </QList>
  </QDrawer>

  <QPageContainer>
    <RouterView />
  </QPageContainer>
</QLayout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Perfil',
    icon: 'account_circle',
    to: 'profile'
  },
  {
    title: 'Productos',
    icon: 'shopping_bag',
    to: 'products'
  },
  {
    title: 'Ventas',
    icon: 'shopping_cart',
    to: 'sales'
  },
  {
    title: 'Clientes',
    icon: 'supervisor_account',
    to: 'customers'
  },
  {
    title: 'Unidades',
    icon: 'ac_unit',
    to: 'units'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  methods: {
    handleCloseSession () {
      localStorage.removeItem('token_soa')
      localStorage.removeItem('user_soa')
      this.$router.go()
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
