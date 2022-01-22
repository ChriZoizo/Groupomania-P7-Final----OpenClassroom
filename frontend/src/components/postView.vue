<template>
  <div class="container-postView">
    <div class="postView-card" v-if="update != true">
      <div class="postView-card__header">
        <div class="postView-card__header__profilImg">
          <img
            class="post-card__header-profilImg container-sm"
            src="../assets/default_profil_image.png"
          />
        </div>
        <div class="postView-card__header__userName">
          <router-link
            v-if="this.post.User.firstName != null"
            :to="'/profil/' + this.post.userId"
            >{{ this.post.User.firstName }}
            {{ this.post.User.lastName }}</router-link
          >
          <router-link v-else :to="'/profil/' + this.post.userId">{{
            this.post.User.email
          }}</router-link>
        </div>
      </div>
      <div class="postView-card__body">
        <div class="postView-card__body__content">
          <p>{{ this.post.content }}</p>
        </div>
        <div class="postView-card__body__image">
          <img
            :src="this.post.postImageUrl"
            v-bind:alt="'Image contenus dans une publication'"
            class="post-image-container"
          />
        </div>
      </div>
      <div class="post-card__footer">
        <p>
          date du post : {{ new Date(this.post.createdAt).getDate() }} /
          {{ new Date(this.post.createdAt).getMonth() + 1 }} /
          {{ new Date(this.post.createdAt).getFullYear() }}
        </p>
      </div>
      <div class="postView-action">
        <button
          class="postView-action__button"
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
          v-on:click="deletePost(this.post.id)"
        >
          Supprimer le post
        </button>
        <button
          class="postView-action__button"
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
          v-on:click="switchUpdateMode()"
        >
          Modifier
        </button>
      </div>
    </div>
    <!-- ------------------------------------------- -->
    <div class="postUpdate-card" v-if="update != false">
      <div class="postUpdate-card__body">
        <form @submit.prevent="updatePost(post.id)" class="postUpdate-form__content">
          <div class="formGroup">
            <label for="content">Contenus</label>
            <textarea
              type="text"
              id="content"
              class="form-control"
              v-model="postUpdateData.content"

              maxlength="500"
              required
            />
          </div>
          <div class="form-group">
            <label for="postImg">Ajouter une image/GIF</label> :
            <input
              type="file"
              name="fileAttachment"
              class="form-control"
              accept=".jpeg, .png, .jpg .gif"
              v-on:change="loadAttachment($event)"
            />
          </div>
           <input type="submit" value="Enregistrer les modifications" />
        </form>

        <div class="postUpdate-form__body__content">
          <p>{{ this.post.content }}</p>
        </div>
        <div class="postUpdate-form__body__image">
          <img
            :src="this.post.postImageUrl"
            v-bind:alt="'Image contenus dans une publication'"
            class="post-image-container"
          />
        </div>
      </div>
      <div class="post-card__footer">
        <p>
          date du post : {{ new Date(this.post.createdAt).getDate() }} /
          {{ new Date(this.post.createdAt).getMonth() + 1 }} /
          {{ new Date(this.post.createdAt).getFullYear() }}
        </p>
      </div>
      <div class="postUpdate-action">
        <button
          class="postUpdate-action__button"
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
          v-on:click="deletePost(this.post.id)"
        >
          Supprimer le post
        </button>
        <button
          class="postUpdate-action__button"
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
          v-on:click="switchUpdateMode()"
        >
          Annuler
        </button>
      </div>
      <button v-on:click="test">-----------------</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      update: false,
      currentUserId: localStorage.getItem("userId"),

      postUpdateData: {
        content: "",
        file: "",
      },

      post: "",

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

  created() {
    this.setPostFromUrlId();
  },

  methods: {
    setPostFromUrlId() {
      const id = this.getUrlId();
      this.getPostInfos(id);
    },

    getUrlId() {
      const url = this.$route.path.split("/");
      const postId = parseInt(url[2]);
      console.log(postId);
      return postId;
    },

    getPostInfos(id) {
      this.axios.get(`http://localHost:3000/api/post/${id}`).then((res) => {
        const post = res.data.post;
        this.post = post;
        this.postUpdateData.content = post.content
      });
    },

    deletePost(id) {
      this.axios.delete(`http://localhost:3000/api/post/${id}`).then((res) => {
        console.log(res)
        console.log("POST DELETED");
        this.$router.go("/home");
      });
    },

    updatePost(id) {
      const formData = new FormData();
      formData.append("content", this.postUpdateData.content);
      formData.append("imageUrlPrev", this.post.postImageUrl);
      console.log('@@@@@@@@@@@@°°°°°°°')
      console.log(this.postUpdateData.file.length)
      if (this.postUpdateData.file.length != 0) {
        console.log("fichier present");
        formData.append("fileAttachment", this.postUpdateData.file);
      }
      console.log(formData)
      this.axios
        .put(`http://localhost:3000/api/post/${id}`, formData)
        .then((res) => {
          console.log(res);
       this.$router.go(`/home/${id}`);
        });
    },

        loadAttachment(event) {
      console.log(event.target.files[0]);
      this.postUpdateData.postImageUrl = event.target.files[0].name;
      this.postUpdateData.file = event.target.files[0];
    },

    switchUpdateMode() {
      this.update = !this.update;
      console.log(this.update);
    },

    test() {
      console.log(this.postUpdateData.content);
    },
  },
};
</script>
