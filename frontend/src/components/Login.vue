<template>
  <form @submit.prevent="login()" autocomplete="off">

    <div class="formField">
      <label for="inputEmail">Email</label>
      <input
          v-model="inputEmail"
          type="text"
          id="inputEmail"
          placeholder="Entrez votre email."
      />
    </div>

    <div class="formField">
      <label for="inputPassword">Mot de passe</label>
      <input
          v-model="inputPassword"
          type="password"
          id="inputPassword"
          placeholder="Entrez mot de passe."
      />
    </div>

    <div>
      <input type="submit" value="Connexion">
    </div>

  </form>
</template>

<script>
import axios from 'axios';


export default {
  name: "Login",
  data() {
    return {
      inputEmail: '',
      inputPassword: ''
    };
  },
  methods: {
    login() {
      axios
          .post('http://localhost:3000/api/user/login', {
            email: this.inputEmail,
            password: this.inputPassword
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.mail = "";
            this.password = "";
            this.$router.push({path: '/Message'});
          })
          .catch(() => {
            this.mail = "";
            this.password = "";
            this.$router.push("/");
          });
    }
  },
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