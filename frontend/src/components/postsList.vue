<!-- * - COMPOSANT : Liste des publications de la BDD -->
<template>
  <div class="container-post-list">
    <!-- LOADER -->
    <div v-if="loading" class="">Chargement des publications ...</div>
    <!-- LOOP (Boucle iterant sur le resultat de la methode GETALLPOST du module (Array))  -->
    <div v-for="(post, index) in listOfPosts" :key="index" class="post">
      <!-- CARD BEGIN-->
      <router-link class="post-card" :to="'/post/'+ post.id">
        <!-- CARD-header -->
        <div class="post-card__header">
          <!-- Image de pofil -->
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
          <!-- Nom (ou email) de l'utilisateur -->
          <div class="post-card__header-userName">
            <router-link
              v-if="post.User.firstName != undefined"
              :to="'/profil/' + post.userId"
              >{{ post.User.firstName }}
              {{ post.User.lastName }}</router-link
            >
            <router-link v-else :to="'/profil/' + post.userId">{{
              post.User.email
            }}</router-link>
          </div>
          <!-- Bouton d'action -->
          <button
            v-if="post.userId == this.userId || this.isAdmin == 'true'"
            class="post-card__header-action"
            v-on:click="deletePost(post.id)"
          >
            X ( delete )
          </button>
        </div>
        <!-- BODY DE CARD -->
        <!-- Contenus -->
        <div class="post-card__body">
          <div class="post-card__body__content">
            <p>contenu du post: {{ post.content }}</p>
          </div>
          <!-- Image de la publication -->
          <div class="post-card__body__image">
            <img v-if="post.postImageUrl.length !=0"
              :src="post.postImageUrl"
              v-bind:alt="'Image contenus dans une publication de '+ post.User.email"
              class="post-image-container"
            />
          </div>
        </div>
        <div class="post-card__footer">
          <div class="post-card__footer__date">
          <p>
            date du post : {{ new Date(post.createdAt).getDate() }} /
            {{ new Date(post.createdAt).getMonth() + 1 }} /
            {{ new Date(post.createdAt).getFullYear() }}
          </p>
        </div>
        <div class="post-card__footer__reaction">
          <div class="post-card__footer__reaction__like">
          <i class="fas fa-thumbs-up green"></i>
          </div>
          <div class="post-card__footer__reaction__dislike">
          <i class="fas fa-thumbs-down red"></i>
          </div>
        </div>
        </div>
      </router-link>
      <!-- CARD END -->
    </div>
  </div>
</template>

<script>
import Appli from "../App.vue";
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
      userId: localStorage.getItem("userId"),
      /* userIsAdmin: Contient le booleen definisant si le user est ADMIN  */
      isAdmin: localStorage.getItem("userIsAdmin"),
    };
  },

  /* HOOK DE CYCLE DE VIE */
  /* MOUNTED : appel les methods 'getAllPost' et 'getAllUser' lorsque le composant est rendu 
  dans le but de remplir les data correspondantes avec les infos necessaire*/
  created() {
    this.setLocalStorageValue(), this.getAllPost()
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
      });
    },

    deletePost(id) {
      this.axios.delete(`http://localhost:3000/api/post/${id}`).then(() => {
        console.log("POST DELETED");
        this.$router.go("/home");
      });
    },

    setLocalStorageValue() {
      this.userId = localStorage.getItem("userId");
      this.isAdmin = localStorage.getItem("userIsAdmin");
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
    object-fit: scale-down;
  }
}
</style>
