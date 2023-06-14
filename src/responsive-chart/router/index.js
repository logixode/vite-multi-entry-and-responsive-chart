import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Subpage from '../pages/Subpage.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/subpage',
    component: Subpage
  }
]

const router = createRouter({
  history: createWebHashHistory('/responsive-chart/'),
  routes
})

export default router;