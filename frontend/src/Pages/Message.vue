<template>
  <router-link  to="/Profile">
    <button>Mon compte</button>
  </router-link>
  <router-link  to="/CreationMessage">
    <button>Créer un message</button>
  </router-link>
  <h1>Bienvenue sur la page de messagerie !</h1>
  <router-link  to="/ListeUtilisateur">
    <button>Liste des utilisateurs</button>
  </router-link>
</template>

<script>
export default {
  name: "Message"
}
</script>

<style scoped>

</style>