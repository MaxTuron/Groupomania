<template>
    <nav>
      <div>
          <div v-if="isModif===true">
          <router-link  class="navbar" to = "/">Connexion </router-link> -
          <router-link  class="navbar" to = "/signup">Inscription</router-link>
          </div>
          <div v-if="isModif===false">
          <router-link  class="navbar" to = "/Message">Accueil </router-link> -
          <router-link  class="navbar" to = "/Profile">Profil</router-link>
          </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: "navBar",

  computed: {
    isModif() {
      return this.$route.path === '/' || this.$route.path === '/signup'
    }
  }
}
</script>

<style>
button {
  border-radius: 20px;
}
</style>