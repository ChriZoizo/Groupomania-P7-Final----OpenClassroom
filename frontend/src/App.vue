<template>
  <div id="view">
    <Navbar />
    <div v-if="isSigned == false">
    <Login v-on:signed="signed"/></div>
    
    <div v-if='isSigned == true'>
    <router-view /></div>
    <button v-on:click="getUser()">get user</button>
    <!-- Bouton de TEST !! -->
    <button v-on:click="testo()">test</button>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Login from "@/components/formLogin.vue";

export default {
  components: { Navbar, Login },

    /* DATAS : utile a toutes l'app */
  data() {
    return {
      isSigned: false,

      

      user: {
        userId: {
          type: Number,
        },
        email: {
          type: String,
        },
        fistName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        bio: {
          type: String,
        },
        isAdmin: {
          type: Boolean,
        },
      },

      allPosts: {
        type: Array,
      },
    };
  },

  mounted() {
    this.getUser();
  },

  methods: {
    getUser() {
      this.axios.get(`http://localhost:3000/api/user/1`).then((userFind) => {
        const datas = userFind.data.user;
        (this.user.userId = datas.id),
          (this.user.email = datas.email),
          (this.user.firstName = datas.firstName),
          (this.user.lastName = datas.lastName),
          (this.user.bio = datas.bio),
          (this.user.isAdmin = datas.isAdmin);
      });
      /* ADD CATCH !!!!!*/
    },
    getAllPosts() {
      this.axios.get("http://localhost:3000/api/post")
      .then((posts) => {
        console.log(posts);
      });
    },

    /* Fonction de TEST !!!!!!!!!! */
    signed() {
      this.isSigned = true;
      console.log(this.isSigned)
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
