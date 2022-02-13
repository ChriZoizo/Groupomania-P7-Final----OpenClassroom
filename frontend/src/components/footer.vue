<!-- * - COMPOSANT : Footer -->
<template>
<!-- * FOOTER BEGIN  -->
  <footer id="footer">
    <div class="footer clear-text">
      <!-- - Footer top -->
      <div class="footer__middle">
        <!-- Footer top Left -->
          <!-- Mailer 'contactez-nous' -->
        <div class="footer__middle__side">
          <a href="mailto:groupomania-support@yopmail.com" class="clear-text"
            >Contactez nous</a
          >
        </div>
        <!-- Footer top middle -->
        <!-- Bouton 'haut de page' - Utilise la methode 'scrollToTop' -->
        <div v-on:click="scrollToTop" class="footer__middle__up-page text-center">
          <i class="fas fa-angle-double-up fa-2x tertiary-colored"></i>
          <p>Haut de page</p>
        </div>
        <!-- Footer top right -->
        <!-- Liens vers 'A propos' -->
        <div class="footer__middle__side">
          <router-link class="remove-decoration clear-text" to="/about"
            ><p>A propos de l'entreprise</p></router-link
          >
        </div>
      </div>
      <!-- - Footer Bottom : Copyright -->
      <div class="footer__bottom copyright">
        <p><span class="tertiary-colored"> © </span>Copyright 2021 - 2022</p>
      </div>
    </div>
  </footer>
  <!-- END FOOTER END -->
</template>

<script>
/* * -- SCRIPT -- */
export default {
  name: "footer",

/* - Methods */
  methods: {
    /*. scrollToTop : Methode qui scroll automatiquement tout en haut de la page affiché */
    scrollToTop() {
      window.scrollTo(0, top);
    },
  },
};
</script>

<style lang="scss" scoped>
/* * -- STYLE -- */
/* Importation du fichier contenant les mixins, variables et autres joyeusetés du genre */
@import "../../public/style.scss";

/* Balise Footer entiere */
footer {
  z-index: 6; /* Z-index 6 pour que le footer soit toujours visible meme par dessus les 'loader' */
  height: 140px;
  bottom: 0;
  width: 100%;
  background-color: $primary-color;

  & a,
  p {
    text-decoration: none;
    font-family: $primary-font; /* Obligatoir pour appliquer la bonne police au <a> */
    margin: 0;
    & .fas {
      color: $tertiary-color;
    }
  }

/* Classe de la <div> contenant le contenus du footer a affiché */
  & .footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 50px;
    margin: 0 auto 0 auto;
    height: 80%;
    width: 80%;

    &__top {
      height: 40px;
    }
    &__middle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &__side {
        width: 200px;
        padding: 15px 0;
      }
    }

    &__bottom {
      display: flex;
      flex-direction: row;
      justify-content: center;
      /*       margin: 50px 0; */
      & span {
        display: contents;
      }
    }
  }

  @media screen and (max-width: map-get($breakpoints, "phone")) {
    height: 300px;
      text-align: center;

    & .footer {
      height: 90%;
      &__middle {
        flex-direction: column;
        align-items: center;
        height: 200px;
        width: 90%;
        &__up-page {
          order: -1;
        }
      }

      &__bottom {
        margin-top: 40px 0 !important;
      }
    }
  }
}
</style>
