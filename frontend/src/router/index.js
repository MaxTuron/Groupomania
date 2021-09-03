import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../Pages/Accueil.vue';
import Signup from '../Pages/Signup.vue';
import Message from '../Pages/Message.vue';
import Profile from '../Pages/Profile.vue';
import CreationMessage from '../Pages/CreationMessage.vue';
import modifProfil from '../Pages/modifProfil.vue';
import ListeUtilisateur from '../Pages/ListeUtilisateur.vue';
import ListeMessages from '../Pages/ListeMessages.vue';


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
  {
    path: '/modifProfil',
    name: 'modifProfil',
    component: modifProfil
  },
  {
    path: '/ListeUtilisateur',
    name: 'ListeUtilisateur',
    component: ListeUtilisateur
  },
  {
    path: '/ListeMessages',
    name: 'ListeMessages',
    component: ListeMessages
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
