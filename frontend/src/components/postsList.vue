<!-- * - COMPOSANT : Liste des publications de la BDD -->
<template>
  <div class="post-list">
    <!-- LOADER -->
    <div v-if="loading" class="">Chargement des publications ...</div>
    <!-- A - CARD (Boucle iterant sur le resultat de la methode GETALLPOST du module)  -->
    <div v-for="post in listOfPosts" :key="post" class="post-card">
      <!-- A-1 - HEADER DE CARD -->
      <div class="post-card__header">
        <!-- A-1-a - Image de pofil -->
        <!-- si le USER contient une URL d'image de profil affiche l'image en question -->
        <div
          class="post-card__header-profilImg"
          v-if="listOfUsers[post.userId].profilImageUrl != null"
        >
          <img
            class="post-card__header-profilImg container-sm"
            :src="listOfUsers[post.userId].profilImageUrl"
          />
        </div>
        <!-- sinon affiche une image de profil par defaut -->
        <div class="post-card__header-profilImg" v-else>
          <img
            class="post-card__header-profilImg container-sm"
            src="../assets/default_profil_image.png"
          />
        </div>
        <!-- A-1-b - Nom (ou email) de l'utilisateur -->
        <div class="post-card__header-userName">
          <a
            v-if="listOfUsers[post.userId].firstName != null"
            :href="'http://localhost:3000/api/user/' + post.userId"
            >{{ listOfUsers[post.userId].firstName }}
            {{ listOfUsers[post.userId].lastName }}</a
          >
          <a v-else :href="'http://localhost:3000/api/user/' + post.userId">{{
            listOfUsers[post.userId].email
          }}</a>
        </div>
        <!-- A-1-c - Bouton d'action -->
        <button class="post-card__header-action" v-on:click="deletePost(post.id)">X ( delete )</button>
      </div>
      <!-- A-2 - BODY DE CARD -->
      <!-- A-2-a Contenus -->
      <div class="post-card__body">
        <div class="post-card__body__content">
          <p>contenu du post: {{ post.content }}</p>
        </div>
      </div>
      <div class="post-card__footer">
        <p>date du post : {{ post.createdAt }}</p>
      </div>
    </div>
    <button v-on:click="getAllPost()">Bouton TEST</button>
  </div>
</template>

<script>
export default {
  name: "postList",

  data() {
    return {
      loading: true,
      listOfPosts: "",
      listOfUsers: "",
    };
  },
  mounted() {
    this.getAllPost(), this.getAllUser();
  },
  methods: {
    /* Methode 'GETALLPOST' permettant de recuperer tout les 'Posts' presents en BDD */
    getAllPost() {
      this.axios.get("http://localhost:3000/api/post/").then((posts) => {
        this.listOfPosts = posts.data.posts;
        this.loading = false;
      });
    },

    getAllUser() {
      this.axios.get("http://localhost:3000/api/user").then((users) => {
        this.listOfUsers = users.data.users;
        console.log(users);
      });
    },

    deletePost(id) {
        this.axios.delete(`http://localhost:3000/api/post/${id}`).then(() => {
            console.log("POST DELETED");
            this.$forceUpdate()
        })
    }
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
}
</style>
