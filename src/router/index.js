import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Video = () => import('@/views/Video')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'my', component: My },
      { path: 'question', component: Question },
      { path: 'video', component: Video },
      { path: 'home', component: Home }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
