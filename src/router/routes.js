
const routes = [
  {
    path: '/',
    component: () => import('pages/index.vue'),
    children: [
    ]
  },
  {
    path: '/loans',
    component: () => import('pages/loans.vue'),
    children: [
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
