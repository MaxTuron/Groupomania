<template>
  <div class="row justify-content-around">
    <p class="m-1">Bonjour {{ userName }} !</p>
    <button @click="deconexion">Deconexion</button>
  </div>
  <div class="card-body text-center">
    <div class="dropdown text-center">
      <p>Membre depuis le {{ creation }}</p>
    </div>
  </div>
  <div id="updateButton">
    <textarea
        v-on:keydown="isInvalid = false"
        class="form-control"
        v-model="user"
        id="user"
        name="userName"
        rows="1"
        placeholder="Quel est votre nouveau nom ?"
    ></textarea>
    <button type="button" @click="updateUser(user)">
      Validé
    </button>
  </div>
  <div class="col">
    <button class="btn m-3" @click="deleteUser(id)">
      Supprimer mon compte
    </button>
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
      userName: '',
      creation: '',
      id: '',
      user:'',
    };
  },

  created: function() {
    let id = sessionStorage.getItem('userId');
    let self = this;
    axios
        .get('http://localhost:3000/api/user/getOneUser/' + id)
        .then(res => {
          self.creation = res.data.createdAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/');
          self.userName = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
          self.id = res.data.id;
        })
        .catch(error => {
          console.log(error);
        });
  },

  methods: {
    updateUser(userName) {
      axios
          .put(
              'http://localhost:3000/api/user/updateUser/' + sessionStorage.getItem('userId'),
              {
                userName
              },
              {
                headers: {
                  Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
              }
          )
          .then(res => {
            sessionStorage.setItem('userName', res.data.name);
            window.location.reload();
          })
          .catch(err => console.log(err));
    },

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