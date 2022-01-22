<template>
  <div class="container-post-view">
    <div class="postView-card">
      <div class="postView-card__header">
        <div class="postView-card__header__profilImg">
          <img
            class="post-card__header-profilImg container-sm"
            src="../assets/default_profil_image.png"
          />
        </div>
        <div class="postView-card__header__userName">
          <router-link
            v-if="this.postAuthor.firstName != null"
            :to="'/profil/' + this.post.userId"
            >{{ this.postAuthor.firstName }}
            {{ this.postAuthor.lastName }}</router-link
          >
          <router-link v-else :to="'/profil/' + this.post.userId">{{
            this.postAuthor.email
          }}</router-link>
        </div>
        <button
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
          class="post-card__header-action"
          v-on:click="deletePost(this.post.id)"
        >
          X ( delete )
        </button>
      </div>
      <div class="postView-card__body">
          <div class="postView-card__body__content">
              <p>{{this.post.content}}</p>
          </div>
          <div class="postView-card__body__image">
                <img :src="this.post.postImageUrl" v-bind:alt="'Image contenus dans une publication'" class="post-image-container">
          </div>
      </div>
            <div class="post-card__footer">
        <p>
          date du post : {{ new Date(this.post.createdAt).getDate() }} /
          {{ new Date(this.post.createdAt).getMonth() + 1 }} /
          {{ new Date(this.post.createdAt).getFullYear() }}
        </p>
      </div>
    </div>
    <button v-on:click="test">fddfdf</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUserId: localStorage.getItem("userId"),

      post: {
        userId: 0,
        content: "",
        postImageUrl: "",
        createdAt: "",
        like: 0,
        dislike: 0,
      },

      postAuthor: {
        email: "",
        firstName: "",
        lastName: "",
        nickname: "",
        bio: "",
        isAdmin: false,
      },
    };
  },

  mounted() {
    this.getIdInUrl();
  },

  methods: {
    getIdInUrl() {
      const url = this.$route.path.split("/");
      const postId = parseInt(url[2]);
      console.log(postId);
      this.getPostInfos(postId);
      return postId;
    },

    getPostInfos(id) {
      this.axios.get(`http://localHost:3000/api/post/${id}`).then((res) => {
        const post = res.data.post;
        this.post.content = post.content;
        this.post.userId = post.UserId;
        this.post.postImageUrl = post.postImageUrl;
        this.post.like = post.likeCounter;
        this.post.dislike = post.dislikeCounter;
        this.post.createdAt = post.createdAt;
        this.getPostAuthor(post.UserId);
      });
    },

    getPostAuthor(id) {
      this.axios.get(`http://localHost:3000/api/user/${id}`).then((res) => {
        const author = res.data.user;
        this.postAuthor.email = author.email;
        this.postAuthor.firstName = author.firstName;
        this.postAuthor.lastName = author.lastName;
        this.postAuthor.nickname = author.nickname;
        this.postAuthor.bio = author.bio;
        this.postAuthor.createdAt = author.createdAt;
      });
    },

    
    deletePost(id) {
      this.axios.delete(`http://localhost:3000/api/post/${id}`).then(() => {
        console.log("POST DELETED");
        this.$router.go("/home");
      });
    },

    test() {
      console.log(this.postAuthor);
    },
  },
};
</script>
