<template>
<!-- View contenant les composant 'postCreate' et 'postList'. C'est la page d'accueil de l'App  -->
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <section>
       <PostCreateFormular/>
    <PostList/>
    </section>
  </div>
</template>

<script>
import PostList from '@/components/postsList.vue'
import PostCreateFormular from '@/components/postCreate.vue'

export default {
  name : "Home",
  components: {
    PostList,
    PostCreateFormular
  }
}
</script>

<style lang="scss">
/* SETTINGS (partie contenant les mixins, variables et importations) */
/* Fonts ( 'Montserra' ) */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

/* VARIABLES */
/* Couleurs  */
$primary-color: #222831;
$secondary-color: #393e46;
$tertiary-color: #00adb5;

$grey-light-color: #eeeeee;
$grey-color: #7e7e7e;

$text-clear: #eeeeee;

/* MIXINS */
/* colorations */

@mixin set-color($color) {
  color: $color;
}

@mixin set-background-color($color) {
  background-color: $color;
}

/* SETTINGS END */
.post {
  &-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    padding: 5px 5px 5px 5px;
    margin: 5px 0;
    min-height: 200px;
    background-color: white;
    box-shadow: 1px 1px 3px $primary-color;
    border-radius: 30px;
    overflow: hidden;

    &__header {
      display: flex;
      justify-content: space-between;
      height: 75px;
      background-color: $grey-light-color;
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
