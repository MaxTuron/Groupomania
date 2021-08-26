import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../Pages/Accueil.vue';
import Signup from '../Pages/Signup.vue';
import Message from '../Pages/Message.vue';


const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Message',
    name: 'Message',
    component: Message
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
