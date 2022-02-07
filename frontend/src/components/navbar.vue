<template>
  <nav id="navbar" class="navbar">
    <div class="navbar__left">
      <router-link to="/home" class="contained">
        {{}}
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

<style lang="scss">
@import "../../public/style.scss";

.navbar {
  z-index: 6;
  padding: 0 50px;
  max-height: 130px;
  display: flex;
  justify-content: space-between;
  background-color: $primary-color;

  &__left {
    width: 200px;

    & .main-logo {
      max-height: 100%;
    }
  }

  &__right {
    align-items: center;
    justify-content: space-between;

    & .nav-link {
      margin: 5px 15px;
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
      @media screen and (min-width: map-get($breakpoints,"phone" )) {
        display: none;
      }
      position: relative;
      float: left;
      width: 150px;
      display: flex;
      align-items: center;

      & .dropdown-button {
        font-family: $primary-font; /* Important for vertical align on mobile phones */
        font-size: 22px;
        margin: 0;
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
  & .home-button::after {
    background: $tertiary-color;
  }
}
</style>
