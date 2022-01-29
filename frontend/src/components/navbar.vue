<template>
  <nav id="navbar">
    <div id="navbar__left">
      <router-link to="/home" class="contained">
      {{}}
        <img
          class="main-logo"
          alt="Logo de l'entreprise Groupomania"
          src="../assets/icon-left-font-monochrome-white.png"
        />
      </router-link>
    </div>
    <div id="navbar__right">
      <div v-if="isSigned == true">
      <router-link class="remove-decoration clear-text bold" to="/home"><span>Home</span></router-link>
      <router-link class="remove-decoration clear-text bold" :to="'/profil/'+ this.userId "><span>Profil</span></router-link> 
      <router-link class="remove-decoration clear-text bold" v-if="this.isAdmin == 'true'" to="/admin-dashboard/"><span>( Dashboard Administrateur) </span></router-link>
      <button id="button-deconnect" v-on:click="deconnect()"><p class="bold">deconnexion</p></button>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',

  data() {
    return {
      isSigned: new Boolean(localStorage.getItem('userIsSigned')),
            userId: localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('userIsAdmin')
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
@import "../../public/style.scss";

#navbar {
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

#button-deconnect {
  &:hover{
    @include set-background-color(lighten($tertiary-color, 50%));
  }
  & p {
    margin: 0
  }
  border: none
}

</style>