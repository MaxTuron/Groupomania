<template>
  <p class="m-1">Bonjour {{ name }} !</p>
  <div id="updateButton">
    <router-link  to="/modifProfil">
      <button>Modifier son profil</button>
    </router-link>
  </div>
  <div class="row justify-content-around">
    <button @click="deconexion">Deconexion</button>
  </div>
  <div class="col">
    <button class="btn m-3" @click="deleteUser(id)">
      Supprimer mon compte
    </button>
  </div>
  <div class="card-body text-center">
    <p>Membre depuis le {{ creation }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: "ProfilCompo",
  components: {
  },
  data() {
    return {
      name: '',
      creation: '',
      id: '',
      user:'',
    };
  },

  created: function() {
    let id = sessionStorage.getItem('userId');
    let self = this;
    axios
        .get('http://localhost:3000/api/user/getOneUser/' + id, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
        .then(res => {
          self.creation = res.data.createdAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/');
          self.name = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
          self.id = res.data.id;
        })
        .catch(error => {
          console.log(error);
        });
  },

  methods: {

    deconexion() {
      sessionStorage.clear();
      router.push({ path: '/' });
    },

    deleteUser(userId) {
      let id = userId;

      axios
          .delete('http://localhost:3000/api/user/deleteUser/' + id, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
          .then(res => {
            router.push({ path: '/' });
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
};
</script>

<style scoped>

</style>