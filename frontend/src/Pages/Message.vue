<template>
  <section v-if="id!==''">
  <h1>Bienvenue sur la page de messagerie !</h1>
    {{userId}}
  <router-link  to="/Profile">
    <button>Mon compte</button>
  </router-link>
  <router-link  to="/CreationMessage">
    <button>Créer un message</button>
  </router-link>
  <div v-if="admin===true">
    <h1>Menu Administrateur</h1>
    <router-link  to="/ListeUtilisateur">
      <button>Liste des utilisateurs</button>
    </router-link>
    <router-link  to="/ListeMessages">
      <button>Liste des Messages</button>
   </router-link>
    <p>Derniers messages publiées</p>
  </div>

  <div class="posts">
    <div class="card" v-for="item in messages" :key="item.title">
      <div>
      <h2>{{ messageTitle(item) }}</h2>
      <p>{{messageContent(item)}}</p>
        <img v-bind:src="item.urlImage">
        <h3>{{messageDate(item)}}</h3>
        <div v-if="item.userId===id">
          <button type="button" @click="modifMessage(item.id)">
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
  </section>
  <section v-if="id===''">
    <h1>Vous n'avez pas acces à cette page !</h1>
  </section>

</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Message",
  data() {
    return {
      admin: false,
      id: '',
      messages: []
    };
  },
  created: function () {
    let id = sessionStorage.getItem('userId');
    let self = this;
    axios
        .get('http://localhost:3000/api/user/getOneUser/' + id, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
        .then(res => {
          self.admin = res.data.admin;
          self.id = res.data.id;
        })
        .catch(error => {
          console.log(error);
        });
    axios
        .get('http://localhost:3000/api/messages/getAllMessages', {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
        .then(res => {
          this.messages = res.data.messages
        })
        .catch(error => {
          console.log(error);
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    modifMessage(messageId) {
      let id = messageId
      axios
          .get('http://localhost:3000/api/messages/getOneMessage/' + id, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
          .then(res => {
            sessionStorage.setItem("idMessage", res.data.id);
            sessionStorage.setItem("title", res.data.title);
            sessionStorage.setItem("content", res.data.content);
            sessionStorage.setItem("urlImage", res.data.urlImage);
            router.push({ path:'/modifMessage', params: { idMsg: res.data.id,  } });
          })
          .catch(error => {
            console.log(error);
          });
    },

    messageTitle(item){
      return item.title.charAt(0).toUpperCase() + item.title.slice(1);
    },
    messageContent(item){
      return item.content
    },
    messageDate(item){
      return item.createdAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('/')
    },

  }
}
</script>

<style>
.card{
  border: 2px black solid;
  margin: 5px 0 5px 0;
  background-color: azure;
}
</style>