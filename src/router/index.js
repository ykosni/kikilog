import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import NewPostPage from '../pages/NewPostPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'



const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/new', component: NewPostPage },
  { path: '/profile', component: ProfilePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
