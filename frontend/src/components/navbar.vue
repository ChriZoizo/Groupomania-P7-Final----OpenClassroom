<template>
<!-- * - COMPOSANT : NavBar -->
<!-- NAVBAR BEGIN -->
  <nav id="navbar" class="navbar">
    <!-- Partie de gauche -->
    <div class="navbar__left">
      <!-- Logo entreprise = Lien vers Acuueil -->
      <router-link to="/home" class="contained">
        <img
          class="main-logo"
          alt="Logo de l'entreprise Groupomania"
          src="../assets/icon-left-font-monochrome-white.png"
        />
      </router-link>
    </div>
    <div class="navbar__right flex-row" v-if="isSigned == true">
      <router-link class="remove-decoration clear-text bold nav-link" to="/home"
        ><span class="home-button">Home</span></router-link
      >
      <router-link
        class="remove-decoration clear-text bold nav-link"
        :to="'/profil/' + this.userId"
        ><span>Profil</span></router-link
      >
      <router-link
        class="remove-decoration clear-text bold nav-link"
        v-if="this.isAdmin == 'true'"
        to="/admin-dashboard/"
        ><span>( Administration ) </span></router-link
      >
      <button id="button-deconnect" v-on:click="deconnect()">
        <p class="bold">deconnexion</p>
      </button>
    </div>
    <div class="navbar__right--dropdown" v-if="isSigned == true">
      <button class="dropdown-button">Menu</button>
      <div class="dropdown-content">
        <router-link
          class="remove-decoration clear-text bold nav-link"
          to="/home"
          ><span class="home-button">Home</span></router-link
        >
        <router-link
          class="remove-decoration clear-text bold nav-link"
          :to="'/profil/' + this.userId"
          ><span>Profil</span></router-link
        >
        <router-link
          class="remove-decoration clear-text bold nav-link"
          v-if="this.isAdmin == 'true'"
          to="/admin-dashboard/"
          ><span>( Dashboard Administrateur) </span></router-link
        >
        <button id="button-deconnect" v-on:click="deconnect()">
          <p class="bold">deconnexion</p>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      isSigned: new Boolean(localStorage.getItem("userIsSigned")),
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("userIsAdmin"),
    };
  },

  created() {
    this.checkConnection();
  },
  mounted() {
    this.checkConnection();
  },

  methods: {
    deconnect() {
      this.$emit("deconnect");
    },

    checkConnection() {
      if (localStorage.getItem("userIsSigned")) {
        this.isSigned == new Boolean(true);
      } else {
        this.isSigned == new Boolean(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/style.scss";

.navbar {
  z-index: 6;
  padding: 0 50px;
  height: 130px;
  display: flex;
  justify-content: space-between;
  background-color: $primary-color;
  @media screen and (max-width: map-get($breakpoints, "xxs")) {
    flex-direction: column;
    height: unset !important;
    padding: 0 0 10px 0;
  }

  &__left {
    width: 200px;
    @media screen and (max-width: map-get($breakpoints, "xxs")) {
      width: 100%;
      padding: 0 10px
    }

    & .main-logo {
      max-height: 120px !important;
      max-width: 120px;
      @media screen and (max-width: map-get($breakpoints, "xxs")) {
        max-height: 100px !important;
        max-width: unset;
        width: calc(100% - 20px);
        object-fit: cover;

      }
    }

    & .main-logo {
      max-height: 100%;
    }
  }

  &__right {
    align-items: center;
    justify-content: space-between;

    & .nav-link {
      margin: 5px 15px;
      &:active {
        color: $tertiary-color !important;
      }
      &:focus {
        color: $tertiary-color !important;
      }
      /*       &:visited{
        color: red !important
        } */
    }

    & span {
      margin: 0 8px;
      position: relative;

      &:hover {
        transition: 500ms;
        color: $tertiary-color;
        &::after {
          background: $tertiary-color;
          content: "";
          height: 2px;
          width: 100%;

          position: absolute;
          left: 0;
          bottom: -5px;
        }
      }
      &::after {
        content: "";
        height: 2px;
        width: 100%;
        background: $secondary-color;
        position: absolute;
        left: 0;
        bottom: -5px;
      }
    }
    @media screen and (max-width: map-get($breakpoints, "phone")) {
      display: none !important;
    }

    &--dropdown {
      position: relative;
      float: left;
      width: 150px;
      display: flex;
      align-items: center;
                @media screen and (min-width: map-get($breakpoints,"phone" )) {
                  display: none;
                }
              @media screen and (max-width: map-get($breakpoints, "xxs")) {
          width: 100%;
        }

      & .dropdown-button {
        font-family: $primary-font; /* Important for vertical align on mobile phones */
        font-size: 22px;
        margin: 0;
        @media screen and (max-width: map-get($breakpoints, "xxs")) {
          width: 100%;
          border-radius: 0
        }
      }

      & .dropdown-content {
        border: $grey-light-color 1px solid;
        display: none;
        position: absolute;
        background-color: $primary-color;

        min-width: 160px;
        box-shadow: 0px 8px 16px 0px $primary-color;
        z-index: 1;
        & .nav-link {
          float: none;
          color: white;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          text-align: left;
        }
      }

      &:hover {
        transition: 500ms;
        & .dropdown-content {
          display: block;
        }
      }
    }
  }
  button {
    width: 120px;
    height: 40px;
    border-radius: 30px;
    padding: 10px;
    margin: 15px 0px 25px 0px;
    background-color: white;
    color: #0c2444;
    &:hover {
      transform: scale(1.02);
      opacity: 0.85;
      -webkit-transition: 0.3s ease-in;
      transition: 0.3s ease-out;
    }
  }

  & button {
    height: 40px;
    border-radius: 30px;
    padding: 10px;
    background-color: white;
    color: #0c2444;
    width: 9rem;
    margin: 5px 15px;
    &:hover {
      background-color: lighten($tertiary-color, 50%);
    }
    & p {
      margin: 0;
    }
    border: none;
  }
}
</style>
