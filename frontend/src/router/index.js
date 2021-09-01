import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../Pages/Accueil.vue';
import Signup from '../Pages/Signup.vue';
import Message from '../Pages/Message.vue';
import Profile from '../Pages/Profile.vue';
import CreationMessage from '../Pages/CreationMessage.vue';


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
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },

  {
    path: '/CreationMessage',
    name: 'CreationMessage',
    component: CreationMessage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
