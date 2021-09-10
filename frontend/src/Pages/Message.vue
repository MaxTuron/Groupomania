<template>
  <section v-if="id!==''">
    <h1>Bienvenue sur la page de messagerie !</h1>

    <router-link  to="/Profile">
      <button><i class="fas fa-user-edit"></i>Mon compte</button>
    </router-link>

    <router-link  to="/CreationMessage">
      <button>Créer un message</button>
    </router-link>

    <div v-if="admin===true">
      <h1>Menu Administrateur</h1>
      <router-link  to="/ListeUtilisateur">
        <button>Liste des utilisateurs</button>
      </router-link>
      <router-link  to="/ListeMessages">
        <button>Liste des messages</button>
      </router-link>
      <router-link  to="/ListeCommentaires">
        <button>Liste des commentaires</button>
      </router-link>
      <p>Derniers messages publiées</p>
    </div>

  <div class="posts">

    <div class="cards" v-for="itemMessage in messages" :key="itemMessage.title">

      <h2>{{ messageTitle(itemMessage) }}</h2>
      <p>{{messageContent(itemMessage)}}</p>
        <img v-bind:src="itemMessage.urlImage">
        <h3>Date de création : {{messageDate(itemMessage)}}</h3>
        <div v-if="itemMessage.userId===id">
          <button type="button" @click="modifMessage(itemMessage.id)">
            <i class="fas fa-edit"></i>Modifier
          </button>
        </div>


        <div v-for="itemComment in comments" :key="itemComment.comment">
          <div v-if="itemMessage.id===itemComment.idMessage">
          <p> Commentaire : {{ itemComment.comment.charAt(0).toUpperCase() + itemComment.comment.slice(1) }} ||
            Date de création: {{ itemComment.createdAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('/')
            }}
          </p>

            <button v-if="id===itemComment.userId" type="button" v-on:click="deleteComment(itemComment.id)">
              <i class="fas fa-trash"></i>Supprimer
            </button>

          </div>
        </div>


        <div class="col-12 justify-content-center form-group">
          <label for="comment">Ecrivez votre commentaire.</label>
          <textarea
              v-on:keydown="isInvalid = false"
              v-model="comment"
              id="comment"
              rows="8"
              placeholder="Saisissez ici votre commentaire."
          ></textarea>
        </div>

      <button type="button" v-on:click="createComment(itemMessage.id, comment)">
        <i class="fas fa-edit"></i>Répondre
      </button>

    </div>
  </div>
  </section>

  <section v-if="id===''">
    <h1>Vous n'avez pas acces à cette page !</h1>
  </section>

</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Message",
  data() {
    return {
      admin: false,
      id: '',
      idMessage:'',
      userId:'',
      comment:'',
      messages: [],
      comments: []
    };
  },
  created: function () {
    let id = sessionStorage.getItem('userId');
    let self = this;
    axios
        .get('http://localhost:3000/api/user/getOneUser/' + id, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
        .then(res => {
          self.admin = res.data.admin;
          self.id = res.data.id;
        })
        .catch(error => {
          console.log(error);
        });
    axios
        .get('http://localhost:3000/api/messages/getAllMessages', {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
        .then(res => {
          this.messages = res.data.messages
        })
        .catch(error => {
          console.log(error);
        })
        .catch(error => {
          console.log(error);
        });
    axios
        .get('http://localhost:3000/api/comments/getAllComment', {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
        .then(res => {
          this.comments = res.data.comments
        })
        .catch(error => {
          console.log(error);
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    modifMessage(messageId) {
      let id = messageId
      axios
          .get('http://localhost:3000/api/messages/getOneMessage/' + id, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
          .then(res => {
            sessionStorage.setItem("idMessage", res.data.id);
            sessionStorage.setItem("title", res.data.title);
            sessionStorage.setItem("content", res.data.content);
            sessionStorage.setItem("urlImage", res.data.urlImage);
            router.push({ path:'/modifMessage', params: { idMsg: res.data.id,  } });
          })
          .catch(error => {
            console.log(error);
          });
    },

    createComment(idMessage, comment) {
      let userId=sessionStorage.getItem('userId')
      axios
          .post('http://localhost:3000/api/comments/createComment',{idMessage, comment, userId} , {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}}, {

          })
            .then(() => {
            window.location.reload()
          })
          .catch(error => {
            console.log(error);
          });
    },

    messageTitle(itemMessage){
      return itemMessage.title.charAt(0).toUpperCase() + itemMessage.title.slice(1);
    },
    messageContent(itemMessage){
      return itemMessage.content
    },
    messageDate(itemMessage){
      return itemMessage.createdAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('/')
    },

    deleteComment(idComment) {
      let id = idComment;

      axios
          .delete('http://localhost:3000/api/comments/deleteComment/' + id, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
          .then(res => {
            window.location.reload(),
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
    },

  }
}
</script>

<style scoped>

.cards{
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px darkblue solid;
  margin: 5px 0 5px 0;
  width: 50%;
}

.posts{
  display: flex;
  flex-direction: column;
  align-items: center;
}
img{
  width: 50%;
}
</style>