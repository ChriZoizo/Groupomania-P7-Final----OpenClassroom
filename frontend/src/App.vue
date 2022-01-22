<template>
  <div id="view">
    <Navbar v-on:deconnect="deconnect()" />
    <div v-if="isSigned != true">
      <Login v-on:signed="signed" />
    </div>

    <div v-if="isSigned == true">
      <router-view :key="$route.fullPath" />
    </div>
    <!-- Bouton de TEST !! -->
    <button v-on:click="test()">test</button>
    <button v-on:click="signed()">CLEAR LOCALSTORAGE</button>
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
        userId:  localStorage.getItem('userId'),
        email: "",
        fistName: "",
        lastName: "",
        nickname: "",
        bio: "",
        isAdmin: false,
      },
      userToken: localStorage.getItem("userToken") != null,
      allPosts: [],
    };
  },

  beforeCreate() {
  },
  mounted() {
    this.checkPreviousConnection();
  },

  methods: {
    
        deconnect() {
          localStorage.clear();
          this.$router.go("/home");
        },

    getAllPosts() {
      this.axios.get("http://localhost:3000/api/post").then((posts) => {
        console.log(posts);
      });
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
      this.user.isAdmin = userDatas.isAdmin;
      this.setUserInData(userDatas)

      this.$router.go('/home')
    },

    checkPreviousConnection() {
      if (this.userToken != null  && this.user.userId != null ) {
        this.axios.get(`http://localhost:3000/api/user/${this.user.userId}`)
        .then((user)=> {
          this.setUserInData(user.data.user)
        })
        this.isSigned = true;
        /*         console.log() */
        this.isAdmin = localStorage.getItem("userIsAdmin");
        console.log("quelque chose")
      } else {
        console.log("rien")
        localStorage.clear();
        this.isSigned = false;
      }
    },

    setUserInData(data) {
      this.user.email = data.email
      this.user.firstName = data.firstName
      this.user.lastName = data.lastName
      this.user.nickname = data.firstName
      this.user.bio = data.firstName
    },

    /* TEST() : FONCTION DE TEST */
    test() {
      console.log(localStorage.getItem("userToken"));
      console.log(this.user);
    },
    clear() {
      localStorage.clear();
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
