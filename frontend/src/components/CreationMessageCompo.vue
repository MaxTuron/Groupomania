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
      <label for="content">Ecrivez votre message.</label>
      <textarea
          v-on:keydown="isInvalid = false"
          v-model="content"
          id="content"
          rows="8"
          placeholder="Saisissez ici votre message."
      ></textarea>
    </div>

    <div class="col-12 justify-content-center text-center">
      <p class="text-center">Formats des photos acceptés: jpg, jpeg, webp, png et gif.</p>
    </div>

    <div class="form-group justify-content-center">
      <label for="file">Téléchargez une photo</label>
      <input
          @change="selectFile()"
          type="file"
          ref="file"
          id="file"
          accept=".jpg, .jpeg, .webp, .gif, .png"
      />
    </div>

    <div>
      <input type="submit" value="Création du message">
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
  components: {},
  data() {
    return {
      title: '',
      content: '',
      file:null,
      urlImage: '',
      userId:'',
      isInvalid: false
    };
  },

  methods: {

    selectFile() {
      this.file = this.$refs.file.files[0];
      this.urlImage = URL.createObjectURL(this.file);
      console.log(this.urlImage);

    },

    send() {
      if (!this.content || !this.title) {
        this.isInvalid = true;
      } else {
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('title', this.title.toString());
        formData.append('content', this.content.toString());
        formData.append('userId', sessionStorage.getItem('userId'));
        axios
            .post('http://localhost:3000/api/messages/createMessage',formData,{headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}},{
              title: this.title,
              content: this.content,
              urlImage: this.urlImage,
              userId: this.userId
            })
            .then(() => {
              alert('Publication crée');
              router.push({ path: '/Message' });
            })
            .catch(error => {
              console.log(error);
              console.log("Dans le catch");
            });
      }
    }
  }
}
</script>

<style scoped>

</style>