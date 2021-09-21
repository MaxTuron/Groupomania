<!--Centre de l'application VUE-->

<template>
  <div id="head">
    <img src="../../logo/icon-left-font-monochrome-white.svg" alt="LogoGroupomania">
    <button v-if="isModif===false" title="Déconnexion" alt="Déconnexion" @click="deconexion"><i class="fas fa-power-off"></i></button>
  </div>
  <div id="nav">
    <navBar></navBar>
  </div>
  <router-view/>
</template>

<script>
import navBar from './components/navBar';
import router from "./router";


export default {
  name: "App",
  components: {navBar},
  methods: {

    deconexion() {
      localStorage.clear();
      router.push({path: '/'});
    }
  },
  computed: {
    isModif() {
      return this.$route.path === '/' || this.$route.path === '/signup'
    }
  }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

@media (max-width: 2600px) {

  html {
    margin: 0px;
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0px;
    height: 100%;
    width: 100%;

  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    background-color: #022e76;
    font-family: 'Raleway', sans-serif;
    height: 100%;
  }

  #head {
    display: flex;
    justify-content: space-between;
  }

  img {
    width: 20%;
  }

  #nav
  {
    margin-top: -20px;
  }

  #nav a {
    font-weight: bold;
    color: #ffffff;
  }

  #head button {
    font-size: xx-large;
    color: white;
    background-color: transparent;
    border: 0px transparent solid;
    padding-top: 15px;
    padding-right: 30px;
  }

  #nav a.router-link-exact-active {
    color: #4a90f8;
  }

}


@media (max-width: 1800px) {

  img {
    width: 30%;
  }
}




</style>