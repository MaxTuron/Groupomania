<template>
  <div class="main">
    <h1>Connexion à un compte</h1>
    <Login></Login>
    <p>
      Si vous n'avez pas de compte cliquez
      <router-link  to="/Signup">
      <button>ici</button>
      </router-link>
    </p>
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  name: 'Accueil',
  components: {Login},

}
</script>

<style>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
