<template>
  <h1>Modification du profil</h1>
  <form @submit.prevent="majUtilisateur()" autocomplete="off" novalidate="true">
    <p>{{email}}</p>

    <div class="formField">
      <label for="inputLastName">Nom</label>
      <input
          v-on:keydown="invalid = false"
          v-model="inputLastName"
          type="text"
          id="inputLastName"
          placeholder="Entrez votre nouveau nom."
      />
    </div>

    <div class="formField">
      <label for="inputName">Prenom</label>
      <input
          v-on:keydown="invalid = false"
          v-model="inputName"
          type="text"
          id="inputName"
          placeholder="Entrez votre nouveau prenom."
      />
    </div>

    <div class="formField">
      <label for="inputEmail">Email</label>
      <input
          v-on:keydown="invalid = false"
          v-model="inputEmail"
          type="text"
          id="inputEmail"
          placeholder="Entrez votre nouvel email."
      />
    </div>

    <div v-show="invalid" class="invalidBox m-2" key="invalid">
      Erreur dans le formulaire.
    </div>

    <button type="button" @click="majUtilisateur(inputName, inputLastName, inputEmail)">
      Modifier
    </button>

  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: "modifProfilCompo",

  data() {
    return {
      id: '',
      inputName: '',
      inputLastName: '',
      inputEmail: '',
      invalid: false
    }
  },

  created: function () {
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
          self.name = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
          self.lastName = res.data.lastName.charAt(0).toUpperCase() + res.data.lastName.slice(1);
          self.email = res.data.email;
          self.id = res.data.id;
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    majUtilisateur(name, lastName, email) {
      if (!this.inputName || !this.inputLastName || !this.inputEmail) {
        return (this.invalid = true);
      }

      const nameRegex = /(.*[A-Za-z]){3,30}/;
      const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

      if (nameRegex.test(this.inputName) && nameRegex.test(this.inputLastName) && mailRegex.test(this.inputEmail)) {
      axios
          .put(
              'http://localhost:3000/api/user/updateUser/' + sessionStorage.getItem('userId'),
              {
                name,
                lastName,
                email
              },
              {
                headers: {
                  Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
              }
          )
          .then(res => {
            sessionStorage.setItem('name', res.data.name);
            sessionStorage.setItem('lastName', res.data.lastName);
            sessionStorage.setItem('email', res.data.email);
            window.location.reload();
          })
          .catch(err => console.log(err));
    }else{
        this.invalid = true;
      }
    }
  }
}
</script>

<style scoped>

</style>