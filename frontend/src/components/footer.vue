<template>
  <footer id="footer">
    <div class="footer clear-text">
      <div class="footer__middle">
        <div class="footer__middle__side">
          <a href="mailto:groupomania-support@yopmail.com" class="clear-text"
            >Contactez nous</a
          >
        </div>
        <div v-on:click="scrollToTop" class="footer__middle__up-page text-center">
          <i class="fas fa-angle-double-up fa-2x tertiary-colored"></i>
          <p>Haut de page</p>
        </div>
        <div class="footer__middle__side">
          <router-link class="remove-decoration clear-text" to="/about"
            ><p>A propos de l'entreprise</p></router-link
          >
        </div>
      </div>
      <div class="footer__bottom copyright">
        <p><span class="tertiary-colored"> © </span>Copyright 2021 - 2022</p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "footer",

  methods: {
    scrollToTop() {
      window.scrollTo(0, top);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/style.scss";

footer {
  z-index: 6;
  height: 140px;
  bottom: 0;
  width: 100%;

  background-color: $primary-color;
  /*   padding: 30px 0 0 0; */

  & a,
  p {
    text-decoration: none;
    font-family: $primary-font;
    margin: 0;
    & .fas {
      color: $tertiary-color;
    }
  }

  & .footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 50px;
    height: 80%;
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

    & .footer {
      height: 90%;
      &__middle {
        flex-direction: column;
        align-items: center;
        height: 200px;
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
