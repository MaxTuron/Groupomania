<template>
  <section v-if="admin==true">
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
              <p >Choisissez l'utilisateur à supprimer dans la liste ci-dessous</p>
            </div>
          </div>
        </article>
        <!--bloc liste utilisateurs-->
        <sub class="col col-md-8">
          <p class="text-black font-weight-bold text-center m-5 ">
            LISTE DE TOUS LES UTILISATEURS
          </p>

          <div v-for="item in user" :key="item.name">
            <p> Prenom: {{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }} || Nom: {{ item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1) }} || Email: {{ item.email }} ||
								Date de création: {{ item.createdAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('/')
              }}
            </p>
              <span class="spanTableau">
								<button class="rounded" @click="supprimerUnUtilisateur(item.id)">Supprimer</button>
							</span>
          </div>
        </sub>
      </section>
  </main>
  </section>
  <section v-if="admin==false">
    <h1>Vous n'avez pas acces à cette page !</h1>
  </section>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'ListeUtilisateurCompo',
  data() {
    return {
      admin: false,
      name: '',
      creation: '',
      user: []
    };
  },
  created: function() {
    axios
        .get('http://localhost:3000/api/user/getOneUser', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
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
        .get('http://localhost:3000/api/user/getAllUser', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then(res => {
          this.user = res.data.users;
          console.log(res);
          console.log(this.user);
        })
        .catch(error => {
          console.log(error);
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    supprimerUnUtilisateur(userId) {
      let id = userId;
      let confSuppr = confirm('Souhaitez-vous supprimer cet utilisateur ?');
      if (confSuppr == true) {
        axios
            .delete('http://localhost:3000/api/user/deleteOneUser/' + id, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              },
            })
            .then(res => {
              console.log(res);
              alert("Utilisateur supprimer");
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
      localStorage.clear();
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