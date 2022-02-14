<template>
  <!-- - *** - HOME - Page d'accueil de l'application. Contient le formulaire de publication et la list des publication  -->
  <div class="home">
    <div class="home__title"><h1>Bienvenue sur Groupomania</h1></div>
    <section>
      <!-- Composant : Formulaire de publication  -->
      <PostCreateFormular v-bind="$attrs"/>
       <!-- Composant : Liste des publications -->
      <PostList
        loaderMessage="Chargement de la page d'accueil ..."
        :postsArray="this.allPosts"
         v-bind="$attrs"
      />
    </section>
  </div>
</template>
<!-- --SCRIPT -- -->
<script>
/* Importation des composants */
import PostList from "@/components/postsList.vue"; /*  Liste des publicatiopns */
import PostCreateFormular from "@/components/postCreate.vue"; /* Formulaire de publication */

export default {
  name: "Home",

  components: {
    PostCreateFormular,
    PostList,
  },

  data() {
    return {
      allPosts: "" /* Data All post, elle seras remplis par la methode getAllPosts puis envoyé en props au composant "postList" */
    };
  },

  beforeMount() {
    this.getAllPosts() 
  },

  methods: {
    /* getAllPosts : Methode qui recupere toutes les publications via un appel a l'API (GET) (Promise).
    - Puis enregitre les 20 dernieres dans la data 'allPosts" 
    - Puis applique la methode 'reverse()' a la meme data pour afficher les recents en premier
    - Sinon 'Catch' affiche un message d'erreur en console */
    getAllPosts() {
      /* Appel a l'API */
      this.axios.get("http://localhost:3000/api/post", { timeout: 7000 })
      .then((posts)=> {
        this.allPosts = posts.data.posts.slice(-20)
      })
      .then(() =>{
        this.allPosts = this.allPosts.reverse()
      })
      .catch(err => console.log('Error in GetAllPosts of Home View :' + err))
    }
  }
};
</script>

<style lang="scss">
@import "../../public/style.scss";
.home {
  &__title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    & h1 {
    @media screen and (max-width: map-get($breakpoints, "phone")){
      font-size: 24px !important;
    }
    @media screen and (max-width: map-get($breakpoints, "phone-small")){
      font-size: 22px !important;
    }
    @media screen and (max-width: map-get($breakpoints, "xxs")){
      font-size: 19px !important;
    }
    }
  }
}
</style>
