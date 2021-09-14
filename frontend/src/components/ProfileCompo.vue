<template>
  <section v-if="id!==''">
  <p>Bonjour {{ inputName }} !</p>
  <div >
    <form @submit.prevent="" autocomplete="off" novalidate="true">

      <div>
        <label for="inputLastName">Nom</label>
        <input
            v-on:keydown="invalid = false"
            v-model="inputLastName"
            type="text"
            id="inputLastName"
            placeholder="Entrez votre nouveau nom."
        />
        <button @click="majLastName(inputLastName)">Editer</button>
      </div>

      <div>
        <label for="inputName">Prenom</label>
        <input
            v-on:keydown="invalid = false"
            v-model="inputName"
            type="text"
            id="inputName"
            placeholder="Entrez votre nouveau prenom."
        />
        <button @click="majName(inputName)">Editer</button>
      </div>

      <div>
        <label for="inputEmail">Email</label>
        <input
            v-on:keydown="invalid = false"
            v-model="inputEmail"
            type="text"
            id="inputEmail"
            placeholder="Entrez votre nouvel email."
        />
        <button @click="majEmail(inputEmail)">Editer</button>
      </div>

      <div>
        <label for="inputPassword">Mot de passe</label>
        <input
            v-on:keydown="invalid = false"
            v-model="inputPassword"
            type="text"
            id="inputPassword"
            placeholder="Entrez votre nouveau mot de passe."
        />
        <button @click="majPassword(inputPassword)">Editer</button>
      </div>

    </form>
  </div>
  <div class="col">
    <button @click="deleteUser(id)">
      Supprimer mon compte
    </button>
  </div>
  <div>
    <p>Membre depuis le {{ creation }}</p>
  </div>
  </section>
  
  <section v-if="id===''">
    <h1>Vous n'avez pas acces à cette page !</h1>
  </section>

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
      inputName: '',
      inputLastName: '',
      inputEmail: '',
      inputPassword:'',
      invalid: false
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
          self.isAdmin = res.data.isAdmin;
          self.inputName = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
          self.inputLastName = res.data.lastName.charAt(0).toUpperCase() + res.data.lastName.slice(1);
          self.inputEmail = res.data.email;
          self.id = res.data.id;
        })
        .catch(error => {
          console.log(error);
        });
  },

  methods: {

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
    },
    majLastName(lastName) {
      if (!this.inputLastName) {
        return (this.invalid = true);
      }
      const nameRegex = /(.*[A-Za-z]){3,30}/;

      if (nameRegex.test(this.inputLastName)) {
        axios
            .put('http://localhost:3000/api/user/updateLastName/' + sessionStorage.getItem('userId'), {lastName},{headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
            .then(() => {
              window.location.reload();
            })
            .catch(err => console.log(err));
      } else {
        this.invalid = true;
      }
    },

    majName(name) {
      if (!this.inputName) {
        return (this.invalid = true);
      }
      const nameRegex = /(.*[A-Za-z]){3,30}/;

      if (nameRegex.test(this.inputName)) {
        axios
            .put('http://localhost:3000/api/user/updateLastName/' + sessionStorage.getItem('userId'), {name}, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
            .then(() => {
              window.location.reload();
            })
            .catch(err => console.log(err));
      } else {
        this.invalid = true;
      }
    },

    majEmail(email) {
      if (!this.inputEmail) {
        return (this.invalid = true);
      }
      const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

      if (mailRegex.test(this.inputEmail)) {
        axios
            .put('http://localhost:3000/api/user/updateEmail/' + sessionStorage.getItem('userId'), {email}, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
            .then(() => {
              window.location.reload();
            })
            .catch(err => console.log(err));
      } else {
        this.invalid = true;
      }
    },

    majPassword(password) {
      if (!this.inputPassword) {
        return (this.invalid = true);
      }
      axios
          .put('http://localhost:3000/api/user/updatePassword/' + sessionStorage.getItem('userId'), {password}, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
          .then(() => {
            window.location.reload();
          })
          .catch(err => console.log(err));
    }
  }
};
</script>

<style>
button {
  border-radius: 20px;
  margin-bottom: 5px;
}
</style>