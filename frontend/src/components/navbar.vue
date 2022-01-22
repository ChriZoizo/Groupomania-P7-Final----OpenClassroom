<template>
  <div id="navbar">
    <div id="navbar__left">
      <router-link to="/home">
        <img
          alt="Logo de l'entreprise Groupomania"
          src="../assets/icon-left-font.png"
          id="navbar__left__logo"
        />
      </router-link>
    </div>
    <div id="navbar-right">
<!--       <router-link to="/signup">signup</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/signup">signup</router-link> | -->
      <router-link to="/about">About</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/profil">Profil</router-link>
      <button v-if="this.isSigned == true" v-on:click="deconnect()">deconnexion</button>
      <button v-on:click='test'>testNavbar1</button>
      <button v-on:click='checkConnection'>testNavbar</button>
    </div>
  </div>
</template>

<script>
  import Appli from "../App.vue"
export default {
  name: 'Navbar',

  data() {
    return {
      isSigned: new Boolean(localStorage.getItem('userIsSigned'))
/*     email: Appli.data.email */
  }
  },

  created() {
    this.checkConnection()
  },
  mounted() {
    this.checkConnection()
  },


  methods: {
    deconnect() {
      this.$emit('deconnect')
    },

    test() {
      let lol = Appli.data;
      console.log(lol)
      console.log(this.isSigned)
    },

    checkConnection() {
      if(localStorage.getItem('userIsSigned')) {
        this.isSigned == new Boolean(true)
      }
      else {
        this.isSigned == new Boolean(false)
      }
    }
  }
}
</script>

<style lang="scss">
#navbar {
  max-height: 200px;
  display: flex;
  justify-content: space-between;
  background-color: grey;

  &__left {
    max-width: 40%;

    &__logo {
      max-width: 150px;
      max-height: 150px;
    }
  }

  &__right {
    max-width: 40%;
  }
}
</style>
