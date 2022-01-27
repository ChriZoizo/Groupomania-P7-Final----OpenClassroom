<template>
  <div id="view">
    <Navbar v-on:deconnect="deconnect()" />
    <div v-if="isSigned != true">
      <Login v-on:signed="signed"/>
    </div>
    <div v-if="isSigned == true">
      <router-view :key="$route.fullPath"/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Login from "@/components/formLogin.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "app",
  components: { Navbar, Login, Footer },

  /* DATAS : utile a toutes l'app */
  data() {
    return {
      isSigned: false,

      user: {
        userId: localStorage.getItem("userId"),
        email: "",
        isAdmin: false,
      },
      userToken: localStorage.getItem("userToken"),
    };
  },
  beforeMount() {
    this.checkPreviousConnection();
  },
  mounted() {
  },

  methods: {
    deconnect() {
      localStorage.clear();
      this.$router.go("/home");
    },

    /* SIGNED() : 
    Lorsque un utilisateur se connecte, un event est $emit du composant 'login' avec les infos du User
    en parametre. Enregistre ces infos en DATA de l'App.vue */
    signed(datas) {
      let userDatas = datas.userInfos;
      /* Enregistrement dans le localStorage des infos necessaires + change le DATA correspondat*/
      /* Boolean signifiant si le user est connecté */
      localStorage.setItem("userIsSigned", true);
      this.isSigned = true;
      /* ID de l'utilisateur */
      localStorage.setItem("userId", userDatas.id);
      /* Token de l'utiulisateur */
      localStorage.setItem("userToken", datas.token);
      /* Booleen signifiant si le user est Admin */
      localStorage.setItem("userIsAdmin", userDatas.isAdmin);
      this.user.userId = userDatas.id;
      this.user.email = userDatas.email;
      this.user.isAdmin = userDatas.isAdmin;
      this.$router.go("/home");
    },

    checkPreviousConnection() {
      if (this.userToken != null && this.user.userId != null) {
/*         this.axios
          .get(`http://localhost:3000/api/user/${this.user.userId}`)
          .then(() => {
          })
          .catch(err => console.log(err)); */
        this.isSigned = true;
        this.isAdmin = localStorage.getItem("userIsAdmin");
      } else {
        localStorage.clear();
        this.isSigned = false;
      }
    },
  },
};
</script>

<style lang="scss">
/* SCSS SETTINGS (partie contenant les mixins, variables et importations) */
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

/* CSS BEGIN */
/* global */

section {
  width: 80%;
  margin: 0 auto;
}
/* ?? */
#view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

p,
h1,
h2,
h3,
h4,
h5,
span,
button {
  font-family: "Montserrat", sans-serif;
}

p,
span {
  font-size: 16px;
}
/* classes utilitaires */
.remove-decoration {
  text-decoration: none;
  color: $primary-color
}

.clear-text {
  @include set-color($text-clear);
}

.bold {
  font-weight: bold;
}

.contained {
  object-fit: contain;
}

.primary-colored {
  color: $primary-color
}

.tertiary-colored {
  color: $tertiary-color
}

.flex-row {
      display: flex;
      flex-direction: row;
}

/* ID */

#app {
  text-align: center;
}

/* NAVBAR */

#navbar {
  padding: 0 50px;
  max-height: 200px;
  display: flex;
  justify-content: space-between;
  @include set-background-color($primary-color);

  &__left {
    width: 200px;

    & .main-logo {
      max-height: 100%;
    }
  }

  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 60%;

    & span {
      margin: 0 8px;

      &:hover {
        transition: 500ms;
        @include set-color($tertiary-color);
      }
    }
  }
}

/* FOOTER */
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
