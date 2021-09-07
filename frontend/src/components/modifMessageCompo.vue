<template>
  <h1>Modification d'un message</h1>
  <form @submit.prevent="majMessage()" autocomplete="off" novalidate="true">

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

    <button type="button" @click="majMessage(title, content)">
      Modifier
    </button>

    <button type="button" @click="deleteMessage()">
      Supprimer
    </button>

    <div v-show="invalid" class="invalidBox m-2" key="invalid">
      Erreur dans le formulaire.
    </div>

  </form>
</template>

<script>

import axios from "axios";
import router from "../router";

export default {
  name: "modifMessageCompo",
  data() {
    return {
      title: '',
      content: '',
      file: null,
      urlImage: '',
      isInvalid: false
    }
  },
    methods: {

      selectFile() {
        this.file = this.$refs.file.files[0];
        this.urlImage = URL.createObjectURL(this.file);
      },

      majMessage(title, content) {
        if (!this.title || !this.content) {
          return (this.invalid = true);
        }
          axios
              .put(
                  'http://localhost:3000/api/messages/updateMessage/' + sessionStorage.getItem('idMessage'),
                  {
                    title,
                    content,
                    urlImage: this.urlImage
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                  }
              )
              .then(() => {
                router.push({ path:'/Message' });
              })
              .catch(err => console.log(err));
        },
      deleteMessage() {
        let id = sessionStorage.getItem('idMessage');

        axios
            .delete('http://localhost:3000/api/messages/deleteMessage/' + id, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
            .then(res => {
              router.push({ path: '/Message' });
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
      }
    }
}
</script>

<style scoped>

</style>