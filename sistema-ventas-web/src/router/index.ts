import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue'),
      meta: { layout: 'public' }
    },
    {
      path: '/pos',
      name: 'pos',
      component: () => import('../views/PosView.vue'),
      meta: { requiresAuth: true } // Protegida
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/admin/UsersView.vue'),
      meta: { requiresAuth: true } // Protegida
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

// Guardia de navegación (El portero)
router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  // Si la ruta pide autenticación y no hay token, fuera al login
  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }

  // Si ya estás logueado, no te dejo entrar al login
  if (to.name === 'login' && token) {
    return { name: 'pos' }
  }
})

export default router
