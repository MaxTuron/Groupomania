<template>
  <h1>Bienvenue sur la page de messagerie !</h1>
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
  </div>

  <div>
    <p>
      Derniers messages publiées
    </p>
    <div v-for="item in messages" :key="item.title">
      <h2>{{ item.title.charAt(0).toUpperCase() + item.title.slice(1) }}</h2>
      <p>{{ item.content}}</p>
      <img src="{{ item.urlImage }}">
        <h3>{{ item.createdAt
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('/') }}
        </h3>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Message",
  data() {
    return {
      admin: false,
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
  }
}
</script>

<style scoped>

</style>