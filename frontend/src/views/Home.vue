<template>
  <!-- View contenant les composant 'postCreate' et 'postList'. C'est la page d'accueil de l'App  -->
  <div class="home">
    
    <div class="home__title"><h1>Bienvenue sur Groupomania</h1></div>

    <img alt="Vue logo" src="../assets/logo.png" />
    <section>
      <PostCreateFormular/>
      <PostList
        loaderMessage="Chargement de la page d'accueil ..."
        :postsArray="this.allPosts"
      />
    </section>
  </div>
</template>

<script>
import PostList from "@/components/postsList.vue";
import PostCreateFormular from "@/components/postCreate.vue";

export default {
  name: "Home",

  components: {
    PostCreateFormular,
    PostList,
  },

  data() {
    return {
      allPosts: ""
    };
  },

  beforeMount() {
    this.getAllPosts()
  },

  methods: {
    getAllPosts() {
      this.axios.get("http://localhost:3000/api/post", { timeout: 5000 })
      .then((posts)=> {
        console.log(posts)
        this.allPosts = posts.data.posts.slice(-20)
      })
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
      width: 500px;
    }
  }
}
</style>
