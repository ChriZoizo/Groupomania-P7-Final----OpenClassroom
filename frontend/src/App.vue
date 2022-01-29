<template>
  <div id="view">
    <Navbar v-on:deconnect="deconnect()" />
    <div v-if="isSigned != true">
      <Login v-on:signed="signed"/>
    </div>
    <div class="router-view" v-if="isSigned == true">
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
/* Variables, Mixins, ... IMPORT */
@import "../public/style.scss";

#app {
  text-align: center;
}




</style>
