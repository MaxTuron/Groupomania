<template>
  <div class="hello">
    <img src="../../../logo/icon-above-font.svg">
    <Login msg="Bienvenue sur le site de Groupomania"></Login>
    <h2>Si vous n'avez pas de compte cliquez <button>ici</button></h2>
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  name: 'Accueil',
  components: {Login},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
img{
  width: 20%;
}
</style>
