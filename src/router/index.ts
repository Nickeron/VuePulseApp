import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.getSession()

  if (!authStore.user && to.meta.requiresAuth) {
    return next({ name: '/login' })
  }

  if (authStore.user && !to.meta.requiresAuth) {
    return next({ name: '/' })
  }
})

export default router
