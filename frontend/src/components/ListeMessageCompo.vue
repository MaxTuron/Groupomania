<template>
  <section v-if="admin===true">
  <main class="container">
    <h2 class="my-2 btn-secondary font-weight-bold">Administration du site</h2>
    <section id="main" class="row">
      <!-- bloc utilisateur -->
      <article class="col-12 col-md-4">
        <div class="card bg-light my-3 class=center-block" style="float:none;">
          <div class="card-header">
            <div class="row justify-content-around">
              <p class="m-1">Bonjour {{ name }} !</p>
              <button @click="sessionClear">DECONNEXION</button>
            </div>
          </div>
          <div class="dropdown text-center">
            <p>Membre depuis le {{ creation }}</p>
          </div>
          <div class="card-body mx-auto font-weight-bold">
            <p >Choisissez le message à supprimer dans la liste ci-dessous </p>
          </div>
        </div>
      </article>
      <sub>
        <p>
          LISTE DE TOUS LES MESSAGES
        </p>

        <div v-for="item in messages" :key="item.title">
          <p> Titre: {{ item.title.charAt(0).toUpperCase() + item.title.slice(1) }} || Contenu : {{ item.content}} || urlImage: {{ item.urlImage }} ||
            Date de création: {{ item.createdAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('/')
            }}
          </p>
          <span>
            <button @click="supprimerMessage(item.id)">Supprimer</button>
          </span>
        </div>
      </sub>
    </section>
  </main>
  </section>
  <section v-if="admin===false">
    <h1>Vous n'avez pas acces à cette page !</h1>
  </section>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'ListeMessageCompo',
  data() {
    return {
      admin: false,
      name: '',
      creation: '',
      messages: []
    };
  },
  created: function() {
    axios
        .get('http://localhost:3000/api/user/getOneUser', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
        .then(res => {
          this.creation = res.data.createdAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/');
          this.admin = res.data.admin;
          this.name = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
        })
        .catch(error => {
          console.log(error);
        });
    axios
        .get('http://localhost:3000/api/messages/getAllMessages', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
        .then(res => {
          this.messages = res.data.messages
        })
        .catch(error => {
          console.log(error);
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    supprimerMessage(messageId) {
      let id = messageId;
      let confSuppr = confirm('Souhaitez-vous supprimer ce message ?');
      if (confSuppr == true) {
        axios
            .delete('http://localhost:3000/api/messages/deleteMessage/'+id, {
              headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
              },
            })
            .then(res => {
              console.log(res);
              alert("Message supprimer");
              location.reload();
            })
            .catch(error => {
              location.reload();
              console.log(error);
            });
      } else {
        return;
      }
    },
    sessionClear() {
      sessionStorage.clear();
      router.push({ path: '/' });
    },
  }
};
</script>

<style>
button {
  border-radius: 20px;
}
</style>