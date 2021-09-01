<template>
  <h1>Création d'un message</h1>
  <form @submit.prevent="send()" autocomplete="off" novalidate="true">

    <div class="formField">
      <label for="title">Titre</label>
      <input
          v-on:keydown="invalid = false"
          v-model="title"
          type="text"
          id="title"
          placeholder="Entrez un titre."
      />
    </div>

    <div class="col-12 justify-content-center form-group">
      <label for="content">Ecrivez quelque chose.</label>
      <textarea
          v-on:keydown="isInvalid = false"
          class="form-control"
          v-model="content"
          id="content"
          name="contenu"
          rows="8"
          placeholder="Saisissez ici votre message."
      ></textarea>
    </div>

    <div class="col-12 justify-content-center text-center">
      <p class="text-center">Formats des photos acceptés: jpg, jpeg, webp, png et gif.</p>
    </div>

    <div class="form-group justify-content-center">
      <label for="urlImage">Téléchargez une photo</label>
      <input
          @change="selectFile()"
          type="file"
          ref="urlImage"
          name="image"
          class="form-control-file"
          id="urlImage"
          accept=".jpg, .jpeg, .webp, .gif, .png"
      />
    </div>

    <div>
      <input type="submit" value="Envoie du message">
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
  name: "CreationMessageCompo",
  components: {}, data() {
    return {
      title: '',
      content: '',
      urlImage: null,
      isInvalid: false
    };
  },

  methods: {

    selectFile() {
      this.urlImage = this.$refs.urlImage.files[0];
    },

    send() {
      if (!this.urlImage || !sessionStorage.getItem('userName') || !this.content || this.content > 1500) {
        this.isInvalid = true;
      } else {
        const formData = new FormData();
        formData.append('urlImage', this.urlImage);
        formData.append('title', this.title.toString());
        formData.append('content', this.content.toString());
        axios
            .post('http://localhost:3000/api/messages/CreateMessages/', formData, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
            .then(() => {
              this.title = '';
              this.content = '';
              this.urlImage = null;
              alert('Publication crée');
              router.push({path: '/Message'});
            })
            .catch(error => {
              console.log(error);
            });
      }
    }
  }
}
</script>

<style scoped>

</style>