<template>
  <div class="container-profil">
      --------------------------------------------
    <div class="profil">
      <div class="profil__header">
        <div class="profil__header__names">
          <p v-if="this.user.nickname != null">Bienvenue chez vous <span class="informations">"{{ this.user.nickname }}"</span> </p>
          <p v-if="this.user.nickname == null">Votre profil</p>
        </div>
      </div>
      <div class="profil__body">
        <div class="userInfos">
          <div class="userInfos__left">
            <div class="userInfo__left__email">
              <p class="profil__infoName">Email :
              <span class="informations">{{ this.user.email }}</span></p>
            </div>
            <div class="userInfo__left__firstName">
              <p class="profil__infoName">Prenom :
              <span class="informations" v-if="this.user.firstName != null">{{
                this.user.firstName
              }}</span></p>
            </div>
            <div class="userInfo__left__lastName">
              <p class="profil__infoName">Nom :
              <span class="informations" v-if="this.user.lastName != null">{{
                this.user.lastName
              }}</span></p>
            </div>
          </div>
          <div class="userInfos__right">
            <div class="userInfo__right__bio">
              <p class="profil__infoName">Bio :</p>
              <p class="informations" v-if="this.user.bio != null">{{ this.user.bio }}</p>
              <p v-if="this.user.bio == null">Bio a compléter</p>
            </div>
          </div>
        </div>
      </div>
      <div class="profil__footer">
        <div class="profil__footer__left">
          <p v-if="this.user.isAdmin == true">Membre Administrateur !</p>
        </div>
        <div class="profil__footer__right">
          <p class="informations">
            Membre depuis : {{ new Date(this.user.createdAt).getDate() }} /
            {{ new Date(this.user.createdAt).getMonth() + 1 }} /
            {{ new Date(this.user.createdAt).getFullYear() }}
          </p>
        </div>
      </div>
    </div>
    <button v-on:click="updateMode = !updateMode"> modifier profil</button>
    <div v-if="updateMode"><p>kjklsdjhlfkdshf</p></div>

     <p>--------------------------------------------</p>  
    <button v-on:click="test">test</button>
    <button v-on:click="checkUrl">getUser</button>
  </div>
</template>

<script>
export default {
  name: "UserProfil",

  data() {
    return {
        updateMode: false,

        currentUserId: localStorage.getItem('userId'),
        currentUserIsAdmin: localStorage.getItem('userIsAdmin'),
        currentUserToken: localStorage.getItem('userToken'),

      user: {
        userId: 0,
        email: "",
        firstName: "",
        lastName: "",
        nickname: "",
        bio: "",
        isAdmin: false,
        createdAt: ""
      },
    };
  },

      created() {
         this.getIdInUrl(),this.getUserInfos(this.userIdToDisplay)
    },  

  methods: {
      getUserInfos(id) {
        this.axios.get(`http://localhost:3000/api/user/${id}`).then((user) => {
            console.log(user.data.user)
            let userInfo = user.data.user;
            this.user.userId = userInfo.id,
            this.user.email = userInfo.email,
            this.user.firstName = userInfo.firstName,
            this.user.lastName = userInfo.lastName,
            this.user.nickname = userInfo.nickname,
            this.user.bio = userInfo.bio,
            this.user.createdAt = userInfo.createdAt,
            this.user.isAdmin = userInfo.isAdmin;
        });
      },

          setUserInData(data) {
      this.user.email = data.email
      this.user.firstName = data.firstName
      this.user.lastName = data.lastName
      this.user.nickname = data.firstName
      this.user.bio = data.firstName
    },
  
    getIdInUrl() {
      const url = this.$route.path.split('/')
      const id = parseInt(url[2])
      this.userIdToDisplay = id
      return id
      
    },

      test() {
          console.log(this.user.firstName)
      }
  },
};
</script>

<style lang="scss">
.informations {
font-weight: bolder;
}


</style>
