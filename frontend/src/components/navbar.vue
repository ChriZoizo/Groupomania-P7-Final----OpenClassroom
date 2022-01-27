<template>
  <nav id="navbar">
    <div id="navbar__left">
      <router-link to="/home" class="contained">
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
      <button class="button-deconnect" v-on:click="deconnect()">deconnexion</button>
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