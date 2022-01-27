<template>
  <!-- View contenant les composant 'postCreate' et 'postList'. C'est la page d'accueil de l'App  -->
  <div class="home">
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
/* POST CARD */
.post {
  margin : 35px 0 ;
  &-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    padding: 5px 5px 5px 5px;
    min-height: 200px;
    background-color: lighten($color: $grey-light-color, $amount: 20);
    box-shadow: 1px 1px 3px $primary-color;
    border-radius: 30px 30px 0px 0px;
    overflow: hidden;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 28px 28px 0px 0px;
      height: 75px;
      background-color: lighten($color: $primary-color, $amount: 70);
      &-profilImg {
        height: 100%;
      }
      &-userName {
        font-family: montserrat;
      }
    }

    &__body {
      padding: 15px 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      & p {
        font-size: 28px;
      }
      &__image {
        margin: 0 0 0 15%;
      }
    }

    &__footer {
      padding: 0 30px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;

      &__reaction {
        min-width: 120px ;
        justify-content: space-between;
      }
    }

    &__comments-section{
          box-shadow: 1px 1px 3px $primary-color;
     & form{
       display:flex;
       margin-top: 0 !important;
       & textarea{
         width: 90%;
       }
     }
     &__comments{
       font-family: montserrat;
             background-color: lighten($color: $primary-color, $amount: 80);
             border: $primary-color 1px solid;
             justify-content: space-between;
             padding: 0 10%;
        &__left-author{
          color: $secondary-color
        }     
     }
    }


  }

  &-image-container {
    max-width: 100em;
    max-height: 10em;
    object-fit: scale-down;
  }

  & .reaction{
    &__button{
      min-width: 60px;
      min-height: 25px;
    }
  }
}
</style>
