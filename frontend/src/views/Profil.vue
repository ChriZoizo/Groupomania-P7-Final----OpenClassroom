<template>
  <section id="user-profil">
    <!-- LOADER -->
    <div v-show="loading" class="loader">
      <div class="loader__container">
        <div class="loader__container__element"></div>
        <div class="loader__container__element2"></div>
        <p class="loader__container__text">Chargement du profil</p>
      </div>
    </div>
    <UserProfil
      :profilId="this.userIdToDisplay"
      :userInfos="this.userProfilData"
    />
    <PostList
      loaderMessage="Chargement du profil"
      :postsArray="this.userPosts"
    />
  </section>
</template>

<script>
import UserProfil from "@/components/userProfil.vue";
import PostList from "@/components/postsList.vue";

export default {
  name: "Profil",
  components: {
    UserProfil,
    PostList,
  },

  data() {
    return {
      currentUserId: parseInt(localStorage.getItem("userId")),
      currentUserIsAdmin: localStorage.getItem("userIsAdmin"),
      currentUserToken: localStorage.getItem("userToken"),

      userIdToDisplay: 0,

      userProfilData: "",

      loading: true,

      updateMode: false,

      userPosts: "",
    };
  },

  beforeMount() {
    this.getIdInUrl(),
    this.getUserInfos(this.userIdToDisplay),
      this.getUserPosts(this.userIdToDisplay);
  },

  methods: {
    getIdInUrl() {
      const url = this.$route.path.split("/");
      const id = parseInt(url[2]);

      this.userIdToDisplay = id;
            console.log('@@@@@@@@@@@@' +this.userIdToDisplay)
      return id;
    },

    getUserPosts(id) {
      this.axios
        .get(`http://localhost:3000/api/post/author/${id}`, { timeout: 5000 })
        .then((posts) => {
          this.userPosts = posts.data.posts;
          this.loading = false;
        })
        .then(() => this.userPosts = this.userPosts.reverse())
        .catch((err) => console.log(err));
    },

    getUserInfos(id){
            this.axios
        .get(`http://localhost:3000/api/user/${id}`, { timeout: 6000 })
        .then((user) => {
          const userInfoOrigin = user.data.user;
          this.userProfilData = userInfoOrigin;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>

<style lang="scss">
@import "../../public/style.scss";

/* - LOADER - */
@keyframes spin1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(540deg);
  }
}
@keyframes spin2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
/* Load Ended */
@keyframes loaded {
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loader {
  position: fixed;
  z-index: 5; /* z-index Navbar et Footer a 6 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: hsla(0, 0%, 100%, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  &__container {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__element {
      position: relative;
      height: 50px;
      width: 50px;
      display: inline-block;
      border-radius: 50px;
      border: 6px solid transparent;
      &:after {
        content: "";
        height: 50px;
        width: 50px;
        position: absolute;
        top: -5px;
        left: -5px;
        bottom: -5px;
        right: -5px;
        height: 50px;
        display: inline-block;

        border-radius: 50px;
        border: 6px solid transparent;
        border-top-color: $tertiary-color;
        border-bottom-color: $tertiary-color;
        animation: spin1 3s cubic-bezier(0.5, 0.7, 0.53, 0.81) infinite;
      }
    }
    &__element2 {
      position: relative;
      width: 30px;
      display: inline-block;
      border-radius: 50px;
      border: 6px solid transparent;
      &:after {
        content: "";
        height: 30px;
        width: 30px;
        position: absolute;
        top: -57px;
        left: -5px;
        bottom: -5px;
        right: -5px;
        height: 30px;
        display: inline-block;

        border-radius: 50px;
        border: 6px solid transparent;
        border-top-color: $secondary-color;
        border-bottom-color: $secondary-color;
        animation: spin2 3s cubic-bezier(0, 1.88, 0.99, -0.27) infinite;
      }
    }

    &__text {
      font-size: 40px;
      font-family: $secondary-font;
    }
  }
}
</style>
