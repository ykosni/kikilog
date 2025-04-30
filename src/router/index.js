import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import NewPostPage from '../pages/NewPostPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import PostDetail from '../pages/PostDetail.vue'
import WhatsNew from '../pages/WhatsNew.vue'




const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/new', component: NewPostPage },
  { path: '/profile', component: ProfilePage },
  { path: '/posts/:id', component: PostDetail },
  { path: '/whatsnew', component: WhatsNew },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
