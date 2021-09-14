<template>
  <h1>Création d'un compte</h1>
  <form @submit.prevent="sendForm()" autocomplete="off" novalidate="true">

      <div class="formField">
        <label for="inputLastName">Nom</label>
        <input
            v-on:keydown="invalid = false"
            v-model="inputLastName"
            type="text"
            id="inputLastName"
            placeholder="Entrez votre nom."
        />
      </div>

    <div class="formField">
      <label for="inputName">Prenom</label>
      <input
          v-on:keydown="invalid = false"
          v-model="inputName"
          type="text"
          id="inputName"
          placeholder="Entrez votre prenom."
      />
    </div>

    <div class="formField">
      <label for="inputEmail">Email</label>
      <input
          v-on:keydown="invalid = false"
          v-model="inputEmail"
          type="text"
          id="inputEmail"
          placeholder="Entrez votre email."
      />
    </div>

    <div class="formField">
      <label for="inputPassword">Mot de passe</label>
      <input
          v-on:keydown="invalid = false"
          v-model="inputPassword"
          type="text"
          id="inputPassword"
          placeholder="Entrez mot de passe."
      />
    </div>

    <div>
      <input type="submit" value="Inscription">
    </div>

    <div v-show="invalid" class="invalidBox m-2" key="invalid">
      Erreur dans le formulaire.
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
      inputPassword: '',
      invalid: false
    };
  },

  methods: {
    async sendForm() {
      if (!this.inputName || !this.inputLastName || !this.inputEmail || !this.inputPassword) {
        return (this.invalid = true);
      }

      const nameRegex = /(.*[A-Za-z]){3,30}/;
      const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

      if (nameRegex.test(this.inputName) && nameRegex.test(this.inputLastName) && mailRegex.test(this.inputEmail)) {
      await axios
          .post('http://localhost:3000/api/user/signup', {
            lastName: this.inputLastName,
            name: this.inputName,
            email: this.inputEmail,
            password: this.inputPassword,
            admin: 0,
          })
          .then(() => {
            router.push({path: '/'});
            console.log("Vous êtes bien inscrit !");
          })
          .catch(error => {
            alert("Adresse mail déjà utilisé");
            console.log(error);
          });
    }else {
        this.invalid = true;
      }
    }
  }
}
</script>

<style>
form  {
  display: grid;
  justify-content: center;
}

label {
  display: table-cell;
}

.formField {
  margin-bottom: 10px;
}
button {
  border-radius: 20px;
}
</style>