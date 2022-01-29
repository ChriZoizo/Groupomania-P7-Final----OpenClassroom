<template>
  <footer id="footer">
    <div class="footer">
<!--       <div class="footer__top">
        <img
          src="../assets/logo.png"
          alt="Logo de l'entreprise Groupomania"
        />
      </div> -->
      <div class="footer__middle">
        <div class="footer__middle__aside">
            <div v-on:click="scrollToTop"><i class="fas fa-angle-double-up fa-2x tertiary-colored"></i></div>
            <p>Haut de page</p>
        </div>
            <a href="mailto:groupomania-support@yopmail.com">Contactez nous</a>
          <router-link class="remove-decoration" to="/about"
            ><p>A propos de l'entreprise</p></router-link
          >
      </div>
      <div class="footer__bottom copyright">
          <p><span class="tertiary-colored">©</span>Copyright 2021 - 2022</p>
      </div>
    </div>
  </footer>

</template>
<script>

export default {
    name: "footer",

    methods: {
      scrollToTop() {
        window.scrollTo(0, top)
      }
    }
}
</script>

<style lang="scss">

/* FOOTER */
@import "../../public/style.scss";

footer {
  @include set-background-color($primary-color);
  padding: 30px 0 0 0;

  & a, p {
    text-decoration: none;
        display: flex;
    flex-direction: column;
    justify-content: space-around;
    @include set-color($text-clear);

    & .fas {
      @include set-color($tertiary-color);
    }
  }

  & .footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 100px;
    & img {
      height: 40px;
      object-fit: contain;
    }
    &__top {
      height: 40px;
    }

    &__middle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &__image {
      object-fit: contain;
    }
  }
}
</style>
