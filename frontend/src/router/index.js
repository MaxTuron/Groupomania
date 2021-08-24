import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../Pages/Accueil.vue';


const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
