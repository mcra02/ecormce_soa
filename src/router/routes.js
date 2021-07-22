
const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    name: 'public',
    redirect: { name: 'login' },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') }
    ],
    beforeEnter: (from, to, next) => {
      const token = localStorage.getItem('token_soa')
      if (token) {
        next({ name: 'main' })
      } else {
        next()
      }
    }
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    name: 'main',
    redirect: { name: 'profile' },
    beforeEnter: (from, to, next) => {
      const token = localStorage.getItem('token_soa')
      if (!token) {
        next({ name: 'public' })
      } else {
        next()
      }
    },
    children: [
      { path: 'profile', name: 'profile', component: () => import('pages/Index.vue') },
      { path: 'productos', name: 'products', component: () => import('pages/products/ProductsList.vue') },
      { path: 'ventas/crear', name: 'salesCreate', component: () => import('pages/sales/CreateSale.vue') },
      { path: 'ventas', name: 'sales', component: () => import('pages/sales/SalesList.vue') },
      { path: 'clientes', name: 'customers', component: () => import('pages/clients/ClientsList.vue') },
      { path: 'unidades', name: 'units', component: () => import('pages/measures/MeasureList.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
