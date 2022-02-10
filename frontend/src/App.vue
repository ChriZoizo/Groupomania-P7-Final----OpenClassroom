<!-- *** - APP : App.vue -->
<template>
  <div id="view">
    <!-- - Navbar -->
    <Navbar v-on:deconnect="deconnect()" />
    <!-- - Login/Signup Section - emet un evenement 'signed' contenant les infos du user (voir la methode 'signed')
    (i)ignorée lorsque la data 'isSigned' devient true -->
    <div v-if="isSigned != true">
      <Login v-on:signed="signed"/>
    </div>
    <!-- - Router-View - contient un attribut special ':key' utile pour l'itilsation du  -->
    <div class="router-view" v-if="isSigned == true">
      <router-view :key="$route.fullPath" v-on:alert="displayAlert" :alertFunction="this.displayAlert"/>
    </div>
<!-- Footer -->
    <Footer />
<vue-basic-alert ref="alert" :closeIn="3000" />
  </div>
</template>

<script>
/* * - SCRIPT */
/* Import des composants utilisé */
import VueBasicAlert from 'vue-basic-alert'
import Navbar from "@/components/navbar.vue";
import Login from "@/components/formLogin.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "app",
  components: { Navbar, Login, Footer, VueBasicAlert },

  /* - Datas */
  data() {
    return {
      /* isSigned = BOOLEEN : Data utilisé pour savoir si le formulaire de connection doit etre affiché */
      isSigned: false,

      /* user = OBJECT : data qui contient  */
      user: {
        userId: localStorage.getItem("userId"),
        isAdmin: false,
      userToken: localStorage.getItem("userToken"),
      },
    };
  },
  beforeMount() {
    this.checkPreviousConnection();
  },
  mounted() {
  },

/* * - Methods */
  methods: {

    /*. deconnect() : Methode qui, comme son nom l'indique, sert a la deconnection de l'utilisateur. Pour faire cela,
    elle netotie le "localStorage" et redirige sur la page '/home' */
    deconnect() {
      localStorage.clear();
      this.$router.go("/home");
      this.displayAlert({'type': "success", 'content': "Votre compte a été deconnecté", "header": "Deconnexion !"})
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
      this.displayAlert({'type': "success", 'content': `Bienvenu ${userDatas.nickname} `, "header": "Connexion !"})
    },

    checkPreviousConnection() {
      if (this.user.userToken != null && this.user.userId != null) {
        this.isSigned = true;
        this.isAdmin = localStorage.getItem("userIsAdmin");
      } else {
        localStorage.clear();
        this.isSigned = false;
      }
    },

    displayAlert(alertDatas) {
      console.log(alertDatas)
      this.$refs.alert.showAlert( alertDatas.type, alertDatas.content, alertDatas.header)
    }
  },
};

</script>

<style lang="scss">
/* Variables, Mixins, ... IMPORT */
@import "../public/style.scss";
/* 
#app {
  text-align: center;
} */

</style>
