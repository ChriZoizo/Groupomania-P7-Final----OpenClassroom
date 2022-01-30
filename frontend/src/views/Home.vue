<template>
  <!-- View contenant les composant 'postCreate' et 'postList'. C'est la page d'accueil de l'App  -->
  <div class="home">
    <div class="home__title">    <h1>Accueil</h1></div>

    <img alt="Vue logo" src="../assets/logo.png" />
    <section>
      <PostCreateFormular />
      {{informations}}
      <PostList />
    </section>
  </div>
</template>

<script>
import PostList from "@/components/postsList.vue";
import PostCreateFormular from "@/components/postCreate.vue";

export default {
  name: "Home",

  props: ['informations'],
  components: {
    PostList,
    PostCreateFormular,
  },
};
</script>

<style lang="scss">
@import "../../public/style.scss";
.home{
  &__title{
    display:flex;
    flex-direction: row;
    justify-content: center;
    & h1{
      width: 200px;
}


  }
}

</style>
