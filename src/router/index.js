import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    beforeEnter (to, from, next) {
      const { ifLogin } = localStorage
      ifLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/logup',
    name: 'Logup',
    component: () => import('@/views/logup/Logup.vue'),
    beforeEnter (to, from, next) {
      const { ifLogin } = localStorage
      ifLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { ifLogin } = localStorage
  ifLogin || to.name === 'Login' || to.name === 'Logup' ? next() : next({ name: 'Login' })
})

export default router
