<template>
  <img src="../../../logo/icon-above-font.svg">
  <h1>Création d'un compte</h1>
  <form @submit.prevent="sendForm()">

      <div>
        <label for="inputLastName">Nom</label>
        <input
            v-model="inputLastName"
            type="text"
            id="inputLastName"
            placeholder="Entrez votre nom."
        />
      </div>

    <div>
      <label for="inputName">Prenom</label>
      <input
          v-model="inputName"
          type="text"
          id="inputName"
          placeholder="Entrez votre prenom."
      />
    </div>

    <div>
      <label for="inputEmail">Email</label>
      <input
          v-model="inputEmail"
          type="text"
          id="inputEmail"
          placeholder="Entrez votre email."
      />
    </div>

    <div class="form-example">
      <label for="inputPassword">Mot de passe</label>
      <input
          v-model="inputPassword"
          type="text"
          id="inputPassword"
          placeholder="Entrez mot de passe."
      />
    </div>

    <div>
      <input type="submit" value="Inscription">
    </div>

  </form>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: "SignupCompo",
  data(){
    return {
      inputLastName: '',
      inputName: '',
      inputEmail: '',
      inputPassword: ''
    };
  },
  methods: {
    sendForm() {
        axios
            .post('http://localhost:3000/api/user/signup', {
              lastName: this.inputLastName,
              name: this.inputName,
              email: this.inputEmail,
              password: this.inputPassword,
              admin: 0,
            })
            .then(() => {
              router.push({ path: '/' });
              console.log("Vous êtes bien inscrit !");
            })
            .catch(error => {
              alert(error.status);
              console.log(error);
            });
    }
  }

}
</script>

<style>
img{
  width: 20%;
}
</style>