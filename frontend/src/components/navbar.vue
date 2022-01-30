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
    <div class="navbar__right" v-if="isSigned == true">
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
        ><span>( Dashboard Administrateur) </span></router-link
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
  padding: 0 50px;
  max-height: 130px;
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
    justify-content: space-between;
    min-width: 30%;
    max-width: 60%;

    & span {
      margin: 0 8px;
      position: relative;

      &:hover {
        transition: 500ms;
        @include set-color($tertiary-color);
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
      float: left;
      width: 150px;

      & .dropdown-button {
        font-family: $secondary-font; /* Important for vertical align on mobile phones */
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

  & .nav-link {
    margin: 5px 15px;
  }

  & button {
    width: 9rem;
    margin: 5px 15px;
    &:hover {
      @include set-background-color(lighten($tertiary-color, 50%));
    }
    & p {
      margin: 0;
    }
    border: none;
  }
  & .home-button {
    font-size: 26px;
  }
}
</style>
