<template>
    <nav>
      <div>
      <router-link class="navbar" to = "/">Accueil</router-link> -
      <router-link class="navbar" to = "/signup">Inscription </router-link> -
      <router-link class="navbar" to = "/Message">Messages </router-link> -
      <router-link class="navbar" to = "/Profile">Profil </router-link>
      </div>
    </nav>
</template>

<script>
export default {
  name: "navBar",
}
</script>

<style>

</style>