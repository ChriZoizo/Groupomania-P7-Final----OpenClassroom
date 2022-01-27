<template>
  <div class="container-profil">
    <div v-show="!updateMode" class="profil">
      <div class="profil__header">
        <div class="profil__header__names">
          <p v-if="this.user.nickname != null">
            Bienvenue 
            <span class="informations">"{{ this.user.nickname }}"</span>
          </p>
          <p v-if="this.user.nickname == null">Votre profil</p>
        </div>
      </div>
      <div class="profil__body">
        <div class="userInfos">
          <p class="profil__infoName">
            Email : <span class="informations">{{ this.user.email }}</span>
          </p>
        </div>
      </div>
      <div class="profil__footer">
        <div class="profil__footer__left">
          <p v-if="this.user.isAdmin == 'true'">Membre Administrateur !</p>
        </div>
        <div class="profil__footer__right">
          <p class="informations">
            Membre depuis : {{ new Date(this.user.createdAt).getDate() }} /
            {{ new Date(this.user.createdAt).getMonth() + 1 }} /
            {{ new Date(this.user.createdAt).getFullYear() }}
          </p>
        </div>
      </div>
      <div
        class="profil__action-buttons"
        v-if="currentUserId == user.userId || currentUserIsAdmin == 'true'"
      >
        <button v-on:click="updateMode = !updateMode">modifier votre nom</button>
      </div>
    </div>
    <form
      @submit.prevent="updateProfil(user.userId)"
      v-show="updateMode"
      class="profil__update-form"
    >
      <div class="profil__update-form__element names form-group">
        <label for="new-names">nom complet : </label>
        <input
          type="text"
          id="new-names"
          class="form-control"
          v-model="user.nickname"
          maxlength="40"
        />
      </div>
      <input
        type="submit"
        value="Enregistrer les modifications ?"
        onclick="return confirm('Etes-vous sûr des modifications apportés ?')"
      />
    </form>
    <p>--------------------------------------------</p>
    <button v-on:click="deleteProfil">Supprimer le compte ?</button>
  </div>
</template>

<script>
export default {
  name: "UserProfil",

  data() {
    return {
      updateMode: false,

      currentUserId: parseInt(localStorage.getItem("userId")),
      currentUserIsAdmin: localStorage.getItem("userIsAdmin"),
      currentUserToken: localStorage.getItem("userToken"),

      user: {
        userId: 0,
        email: "",
        nickname: "",
        bio: "",
        isAdmin: false,
        createdAt: "",
      },
    };
  },

  created() {
    this.getIdInUrl(), this.getUserInfos(this.userIdToDisplay);
  },

  methods: {
    getIdInUrl() {
      const url = this.$route.path.split("/");
      const id = parseInt(url[2]);
      this.userIdToDisplay = id;
      return id;
    },

    setUserInData(data) {
      this.user.email = data.email;
      this.user.firstName = data.firstName;
      this.user.lastName = data.lastName;
      this.user.nickname = data.firstName;
      this.user.bio = data.firstName;
    },

    getUserInfos(id) {
      this.axios.get(`http://localhost:3000/api/user/${id}`).then((user) => {
        let userInfo = user.data.user;
        (this.user.userId = userInfo.id),
          (this.user.email = userInfo.email),
          (this.user.firstName = userInfo.firstName),
          (this.user.lastName = userInfo.lastName),
          (this.user.nickname = userInfo.nickname),
          (this.user.bio = userInfo.bio),
          (this.user.createdAt = userInfo.createdAt),
          (this.user.isAdmin = userInfo.isAdmin);
      });
    },

    updateProfil(id) {
      this.axios
        .put(`http://localhost:3000/api/user/${id}`, this.user)
        .then((profil) => {
          console.log(profil);
          history.go(0);
        });
    },

    deleteProfil() {
      this.axios
        .delete(`http://localhost:3000/api/user/${this.user.userId}`)
        .then(() => {
          localStorage.clear();
          this.$router.go("/home");
        });
    },
  },
};
</script>

<style lang="scss">
.informations {
  font-weight: bolder;
}
</style>
