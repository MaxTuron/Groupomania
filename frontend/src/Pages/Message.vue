<template>
  <section v-if="id!==''">
    <h1>Bienvenue sur la page de messagerie !</h1>

    <router-link  to="/Profile">
      <button title="Mon compte" alt="Mon compte"><i class="fas fa-user-edit"></i> Mon compte</button>
    </router-link>
    <br>
    <router-link  to="/CreationMessage">
      <button title="Créer un message" alt="Créer un message" > <i class="fas fa-plus"></i> Créer un message</button>
    </router-link>

    <div v-if="admin===true">
      <h1>Menu Administrateur</h1>
      <router-link  to="/ListeUtilisateur">
        <button title="Liste des utilisateurs" alt="Liste des utilisateurs"> <i class="fas fa-users"></i> Liste des utilisateurs</button>
      </router-link> <br>
      <router-link  to="/ListeMessages">
        <button title="Liste des messages" alt="Liste des messages"><i class="fas fa-sticky-note"></i> Liste des messages</button>
      </router-link> <br>
      <router-link  to="/ListeCommentaires">
        <button title="Liste des commentaires" alt="Liste des commentaires"><i class="fas fa-comments"></i> Liste des commentaires</button>
      </router-link>
      <p>Derniers messages publiées</p>
    </div>

  <div class="posts">
    <div class="cards" v-for="itemMessage in messages" :key="itemMessage.title">

      <div class="headMessage">
        <h1>{{ messageAuteur(itemMessage) }}</h1>
        <h2>{{ messageDate(itemMessage) }}</h2>
      </div>

      <h3>{{ messageTitle(itemMessage) }}</h3>
      <p>{{messageContent(itemMessage)}}</p>
        <img v-bind:src="itemMessage.urlImage" alt="Image Post">
        <div v-if="itemMessage.userId===id">
          <button title="Modifier" alt="Modifier" type="button" @click="modifMessage(itemMessage.id)">
            <i class="fas fa-edit"></i>Modifier
          </button>
        </div>

        <div v-for="itemComment in comments" :key="itemComment.comment">
          <div class="cardsComment" v-if="itemMessage.id===itemComment.idMessage">
            <div class="comments">
              <p> {{ commentAuteur(itemComment) }} : {{ contenuComment(itemComment)}} </p>
            </div>
            <button title="Supprimer" alt="Supprimer" v-if="id===itemComment.userId" type="button" v-on:click="deleteComment(itemComment.id)">
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

      <button title="Répondre" alt="Répondre" type="button" v-on:click="createComment(itemMessage.id, comment)">
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
    axios
        .get('http://localhost:3000/api/user/getOneUser', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(res => {
          this.admin = res.data.admin;
          this.id = res.data.id;
        })
        .catch(error => {
          console.log(error);
        });
    axios
        .get('http://localhost:3000/api/messages/getAllMessages',{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
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
        .get('http://localhost:3000/api/comments/getAllComment', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
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
          .get('http://localhost:3000/api/messages/getOneMessage/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
          .then(res => {
            localStorage.setItem("idMessage", res.data.id);
            localStorage.setItem("title", res.data.title);
            localStorage.setItem("content", res.data.content);
            localStorage.setItem("urlImage", res.data.urlImage);
            router.push({ path:'/modifMessage', params: { idMsg: res.data.id,  } });
          })
          .catch(error => {
            console.log(error);
          });
    },

    createComment(idMessage, comment) {
      axios
          .post('http://localhost:3000/api/comments/createComment',{idMessage, comment} , {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}, {
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
    messageAuteur(itemMessage){
      return itemMessage.name +' '+ itemMessage.lastName;
    },
    commentAuteur(itemComment){
      return itemComment.name +' '+ itemComment.lastName;
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

    contenuComment(itemComment){
      return  itemComment.comment.charAt(0).toUpperCase() + itemComment.comment.slice(1);
    },

    deleteComment(idComment) {
      let id = idComment;

      axios
          .delete('http://localhost:3000/api/comments/deleteComment/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
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

@media (max-width: 2560px) {
  section{
    background-color:  #022e76;
  }

  p, button {
    font-size: large;
  }

  img {
    height: 80%;
    width: 60%;
  }

  .cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px white solid;
    border-radius: 20px;
    margin: 5px 0 5px 0;
    width: 60%;
    height: 80%;
  }

  .cardsComment {
    padding: 5px;
  }

  .posts {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    border-radius: 20px;
  }

  .comments {
    display: flex;
    align-items: center;
    border: 2px solid white;
    border-radius: 5px;
  }

  .headMessage{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .headMessage h1, h2{
    padding-right: 5px;
    padding-left: 5px;
  }

}

@media (max-width: 700px) {

  .cards {
    width: 90%;
  }

}

</style>