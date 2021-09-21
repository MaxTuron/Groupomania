<template>
  <h1 v-if="isModif===false">Création d'un message</h1>
  <h1 v-if="isModif===true">Modification d'un message</h1>
  <form @submit.prevent="createMessage()" autocomplete="off" novalidate="true">

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
          v-on:change="selectFile()"
          type="file"
          ref="file"
          id="file"
          accept=".jpg, .jpeg, .webp, .gif, .png"
      />
    </div>

    <div>
      <button v-if="isModif===false" title="Création du message" alt="Création du message" type="button" v-on:click="createMessage()">Création du message</button>
    </div>

    <button v-if="isModif===true" type="button" v-on:click="modifMessage()">
      <i class="fas fa-edit"></i>Modifier
    </button>

    <button v-if="isModif===true" type="button" v-on:click="deleteMessage()">
      <i class="fas fa-trash"></i>Supprimer
    </button>

    <div v-show="invalid" class="invalidBox m-2" key="invalid">
      Erreur dans le formulaire.
    </div>

  </form>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: "GestionMessageCompo",
  components: {},
  data() {
    return {
      title: '',
      content: '',
      file:null,
      urlImage: '',
      userId:'',
      idMessage:'',
      isInvalid: false
    };
  },
  created: function(){
    let id = localStorage.getItem('idMessage');
    axios
        .get('http://localhost:3000/api/messages/getOneMessage/'+id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(res => {
          this.title = res.data.title.charAt(0).toUpperCase() + res.data.title.slice(1);
          this.content = res.data.content;
        })
        .catch(error => {
          console.log(error);
        });
  },

  computed: {
    isModif() {
      return this.$route.name === 'modifMessage'
    }
  },

  methods: {

    selectFile() {
      this.file = this.$refs.file.files[0];
      this.urlImage = URL.createObjectURL(this.file);
    },

    createMessage() {
      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('title', this.title.toString());
      formData.append('content', this.content.toString());
          axios
              .post('http://localhost:3000/api/messages/createMessage', formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}, {
                title: this.title,
                content: this.content,
                urlImage: this.urlImage
              })
              .then(() => {
                alert('Publication crée');
                router.push({path: '/Message'});
              })
              .catch(error => {
                console.log(error);
              });
      },

    modifMessage() {
      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('title', this.title.toString());
      formData.append('content', this.content.toString());
        axios
            .put('http://localhost:3000/api/messages/updateMessage/' + localStorage.getItem('idMessage'), formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}, {
                  title: this.title,
                  content: this.content,
                  urlImage: this.urlImage
                })
            .then(() => {
              router.push({path: '/Message'});
            })
            .catch(err => console.log(err));
      },

    deleteMessage() {
      let id = localStorage.getItem('idMessage');

      axios
          .delete('http://localhost:3000/api/messages/deleteMessage/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
          .then(res => {
            router.push({path: '/Message'});
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style>
button{
  border-radius: 20px;
}

</style>