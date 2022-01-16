<template>
  <div id="view">
    <Navbar />
    <div v-if="signed != true">
    <Login /> blablabla</div>
    <div>
    <router-view /></div>
    <button v-on:click="getUser()"></button>
    <!-- Bouton de TEST !! -->
    <button v-on:click="test()"></button>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Login from "@/views/Login.vue";

export default {
  components: { Navbar, Login },

  data() {
    return {
      signed: false,

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
      this.axios.get();
    },

    /* Fonction de TEST !!!!!!!!!! */
    test() {
      console.log(this.post);
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
