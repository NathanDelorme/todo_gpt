import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: LoginPage
  },
  {
    name: 'home',
    path: '/home',
    component: HomePage
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
