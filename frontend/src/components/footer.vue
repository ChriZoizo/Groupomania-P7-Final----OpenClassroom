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
            <a href="#navbar"><i class="fas fa-angle-double-up fa-2x"></i></a>
            <p>Haut de page</p>
        </div>
            <a href="mailto:groupomania-support@yopmail.com">Contactez nous</a>
          <router-link class="remove-decoration" to="/about"
            >A propos</router-link
          >
      </div>
      <div class="footer__bottom copyright">
          <p> © Copyright 2021 - 2022</p>
      </div>
    </div>
  </footer>

</template>
<script>

export default {
    name: "footer",
}
</script>
