<!-- * - COMPOSANT : Liste des publications de la BDD -->
<template>
  <div class="container-post-list">
    <!-- LOADER -->
    <div v-if="loading" class="">Chargement des publications ...</div>
    <!-- A - CARD (Boucle iterant sur le resultat de la methode GETALLPOST du module)  -->
    <div v-for="(post, index) in listOfPosts" :key="index" class="post-card">
      <p style="display:none">{{this.getAuthor(post.UserId)}}</p>
      <!-- A-1 - HEADER DE CARD -->
      <div class="post-card__header">
        <!-- A-1-a - Image de pofil -->
        <!-- si le USER contient une URL d'image de profil affiche l'image en question -->
<!--          <div
          class="post-card__header-profilImg"
          v-if="listOfUsers[post.userId].profilImageUrl != null"
        >
          <img
            class="post-card__header-profilImg container-sm"
            :src="listOfUsers[post.userId].profilImageUrl"
          />
        </div>  -->
        <!-- sinon affiche une image de profil par defaut -->
        <div class="post-card__header-profilImg">

          <img
            class="post-card__header-profilImg container-sm"
            src="../assets/default_profil_image.png"
          />
        </div>
        <!-- A-1-b - Nom (ou email) de l'utilisateur -->
         <div class="post-card__header-userName">
           <router-link v-if="this.author.firstName.length > 1" :to="'/profil/'+ post.userId">{{ this.author.firstName }}
            {{ this.author.lastName }}</router-link>
           <router-link v-else :to="'/profil/'+ post.userId">{{ this.author.email }}</router-link>


        </div>
        <!-- A-1-c - Bouton d'action -->
        <button
          v-if="post.userId == this.userId || this.isAdmin === true"
          class="post-card__header-action"
          v-on:click="deletePost(post.id)"
        >
          X ( delete )
        </button>
      </div>
      <!-- A-2 - BODY DE CARD -->
      <!-- A-2-a Contenus -->
      <div class="post-card__body">
        <div class="post-card__body__content">
          <p>contenu du post: {{ post.content }}</p>
        </div>
        <div class="post-card__body__image">
          <img :src="post.postImageUrl" v-bind:alt="'Image contenus dans une publication'" class="post-image-container">
        </div> 
      </div>
      <div class="post-card__footer">
        <p>
          date du post : {{ new Date(post.createdAt).getDate() }} /
          {{ new Date(post.createdAt).getMonth() + 1 }} /
          {{ new Date(post.createdAt).getFullYear() }}
        </p>
      </div>
    </div>
    <button v-on:click="test()">Bouton TEST</button>
  </div>
</template>

<script>
import Appli from "../App.vue"
export default {

  name: "postList",

  /* DATA :  variables */
  data() {
    return {

      testing: Appli,
      /* loading: boolean definissant si le composantr charge des elements (modifié via les METHODS) */
      loading: true,
      /* listOfPosts: Contient tout les posts en BDD renvoyé par la methods getAllPost() */
      listOfPosts: "",
      /* listOfusers: Contient tout les users en BDD renvoyé par la methods getAllUser() */
      listOfUsers: "",

      /* Valeurs recuperés dans le localStorage les infos enregistré lors de la connexion du user ( Script de app.vue) */
      /* Contient l'ID de l'utilisateur */
      userId: localStorage.getItem('userId'),
      /* userIsAdmin: Contient le booleen definisant si le user est ADMIN  */
      isAdmin: localStorage.getItem('userIsAdmin'),
      
      author: ""
    };
  },

  
  computed: {

  },

  /* HOOK DE CYCLE DE VIE */
  /* MOUNTED : appel les methods 'getAllPosts' et 'getAllUser' lorsque le composant est rendu 
  dans le but de remplir les data correspondantes avec les infos necessaire*/
  mounted() {
    this.setLocalStorageValue(), this.getAllPost(), this.getAllUser();
  },

  /* METHODS */
  methods: {
    /* getAllPost: recupere tout les POSTs en BDD via appel a API, et change le data 'loading' en false */
    getAllPost() {
      this.axios.get("http://localhost:3000/api/post/").then((posts) => {
        /* enregistrement des posts reçus dans la data 'listOfPosts' */
        this.listOfPosts = posts.data.posts;
        /* passe la data booleen 'loding' en false */
        this.loading = false;
        console.log('@@@@@@@@@@@@@@@@@@')
        console.log(posts.data.posts)
      });
    },

    getAllUser() {
      this.axios.get("http://localhost:3000/api/user").then((users) => {
        this.listOfUsers = users.data.users;
        console.log(users);
      });
    },
    
        getAuthor(authorId) {
for (const user of this.listOfUsers) {
  console.log(user.email)
  if (user.id == authorId) {
    this.author = user
    return user
  }
    return "Profil supprimé"
}
    },

    deletePost(id) {
      this.axios.delete(`http://localhost:3000/api/post/${id}`).then(() => {
        console.log("POST DELETED");
        this.$router.go("/home");
      });
    },

    setImageUrlSrc() {
      return "lol"
    },

    setLocalStorageValue() {
      console.log(localStorage.getItem("userIsAdmin"))
      this.userId = localStorage.getItem("userId");
      this.isAdmin =localStorage.getItem("userIsAdmin");
    },

    test(id) {

      console.log(id);
console.log(localStorage.getItem("userIsAdmin"))

    },
  },
};
</script>

<style lang="scss">
.post {
  &-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid black;
    padding: 5px 5px 5px 5px;
    margin: 5px 0;
    max-height: 350px;
    min-height: 200px;

    &__header {
      display: flex;
      justify-content: space-between;
      height: 75px;
      background-color: rgb(252, 241, 228);
      &-profilImg {
        height: 100%;
      }
    }
  }

  &-image-container {
    max-width: 100em;
    max-height: 10em;
    object-fit: scale-down
  }
}
</style>
