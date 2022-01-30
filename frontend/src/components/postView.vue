<!-- * - COMPOSANT : View d'une publication -->
<template>
  <section class="container-post-view">
    <!-- TITRE -->
    <h1 class="post-view__title">Publication</h1>
    <!-- Subtitle + auteur de la publication (router-link) -->
    <h3 class="post-view__subtitle">
      <router-link
        class="remove-decoration primary-font"
        :to="'/profil/' + post.userId"
        ><span class="bold">de </span
        >{{ post.User.nickname || post.User.email }}</router-link
      >
    </h3>
    <!-- CARD BEGIN -->
    <div class="post-view-card" v-if="update == false">
      <!-- CARD-header -->
      <div class="post-view-card__header">
        <!-- Boutons d'action  -->
        <!-- UNIQUEMENT Si l'utilisateur actuel est Administrateur, ou est l'auteur dela publication -->
        <div
          v-if="post.userId == currentUserId || isAdmin == 'true'"
          class="post-view__action"
        >
          <!-- Bouton modifier (Passe la data 'update' a true, faisant disparaitre cette section au profit de la section UPDATE) -->
          <button
            class="post-view__action__button"
            v-on:click="switchUpdateMode()"
          >
            <i class="fas fa-pencil-alt fa-lg"></i>
          </button>
          <!-- Bouton suprrimer -->
          <button
            class="post-view__action__button"
            v-if="post.userId == currentUserId || isAdmin == 'true'"
            onclick="return confirm('Etes-vous sûr de vouloir supprimer cette publication ?')"
            v-on:click="deletePost(post.id)"
          >
            <i class="fas fa-trash-alt fa-lg"></i>
          </button>
        </div>
      </div>
      <!-- CARD-body -->
      <div class="post-view-card__body">
        <!-- contenus de la publication -->
        <div class="post-view-card__body__content">
          <p>{{ post.content }}</p>
        </div>
        <!-- Image de la publication si il y en as une -->
        <div
          v-if="post.postImageUrl.length > 0"
          class="post-view-card__body__image"
        >
          <a :href="post.postImageUrl"
            ><img
              :src="post.postImageUrl"
              alt="'Image contenus dans une publication'"
              class="post-view-image-container"
          /></a>
        </div>
      </div>
      <!-- CARD-footer -->
      <div class="post-view-card__footer">
        <!-- Date de creation de la publication -->
        <div class="post-view-card__footer__date">
          <p class="date">
            <span>date de publication : </span>
            {{ new Date(post.createdAt).getDate() }} /
            {{ new Date(post.createdAt).getMonth() + 1 }} /
            {{ new Date(post.createdAt).getFullYear() }}
          </p>
        </div>
        <!-- like -->
        <div class="post-view-card__footer reaction">
          <div
            v-on:click="reactToPost(1)"
            class="post-view-card__footer reaction__like"
          >
            <i
              v-bind:class="{ grey: liked, green: !liked }"
              class="fas fa-thumbs-up green"
            ></i
            ><span class="reaction__like--counter">{{
              countLike.numberOfLike
            }}</span>
          </div>
          <!-- dislike -->
          <div
            v-on:click="reactToPost(-1)"
            class="post-view-card__footer reaction__dislike"
          >
            <i
              v-bind:class="{ grey: disliked, red: !disliked }"
              class="fas fa-thumbs-down red"
            ></i
            ><span class="reaction__dislike--counter">{{
              countLike.numberOfDislike
            }}</span>
          </div>
        </div>
      </div>
      <!-- COMMENTS SECTION -->
      <div class="post-view-card__comments-section">
        <button v-on:click="commenting = !commenting" class="button">
          <i class="far fa-comment-alt fa-lg"></i> Commenter
        </button>
        <form
          v-show="commenting"
          @submit.prevent="addComment"
          class="post-view-card__comments-section__write-form"
        >
          <textarea
            name="comment"
            id="comment"
            v-model="newComment.content"
            placeholder="Ecrivez votre commentaire ici..."
            maxlength="200"
            required
          ></textarea>
          <input type="submit" value="Publier votre commentaire" />
        </form>

        <div class="post-view-card__comments-section">
          <!--  COMMENT LOOP (boucle iterant sur l'Array de commentaires associés a la publication) -->

          <div
            v-for="(comment, index) in post.Comments"
            :key="index"
            class="post-view-card__comments-section__comment-card"
          >
            <div class="post-view-card__comments-section__comment-card__author">
              <!-- Prenom OU nom OU email de l'auteur du commentaire -->
              <router-link
                class="remove-decoration"
                :to="'/profil/' + comment.User.id"
                ><p>
                  {{ comment.User.nickname || comment.User.email }} :
                </p></router-link
              >
            </div>
            <!-- Contenus du commentaire -->
            <div
              class="post-view-card__comments-section__comment-card__content"
            >
              <p>{{ comment.content }}</p>
            </div>
            <!-- Date du commentaire -->
            <div class="post-view-card__comments-section__comment-card__footer">
              <p class="date">
                {{ new Date(post.createdAt).getDate() }} /
                {{ new Date(post.createdAt).getMonth() + 1 }} /
                {{ new Date(post.createdAt).getFullYear() }}
              </p>
              <div
                v-if="comment.User.id == currentUserId || userIsAdmin == 'true'"
                v-on:click="deleteComment(comment.id)"
                onclick="return confirm('Etes-vous sûr d'effacer ce commentaire ?)"
                class="post-view-card__comments-section__comment-card__footer-delete"
              >
                <i class="fas fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- !!! UPDATE SECTION !!! ne s'affiche que lorsque la data 'update' passe a true, faisant disparaitre la section CARD-POST -->
    <div class="post-update-card" v-show="update">
      <h2>Modification</h2>
      <div class="post-update-card__body">
        <!--  FORM BEGIN -->
        <form @submit="updatePost(post.id)" class="post-update-form__content">
          <!-- inputs pour modifier le CONTENUS de la publication -->
          <div class="form-group">
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
          <!-- Input pour modifier l'image associé a la publication -->
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
          <!-- Bouton d'enregitrement des modifications -->
          <input type="submit" value="Enregistrer les modifications" />
        </form>
      </div>
      <div class="post-update__action">
        <button
          class="post-update__action__button"
          v-on:click="switchUpdateMode()"
        >
          Annuler
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentUserId: parseInt(localStorage.getItem("userId")),
      isAdmin: localStorage.getItem("userIsAdmin"),

      commenting: false,
      update: false,

      liked: false,
      disliked: false,

      postUpdateData: {
        content: "",
        file: "",
      },

      newComment: {
        userId: parseInt(localStorage.getItem("userId")),
        postId: 0,
        content: "",
      },

      post: {},
    };
  },

  computed: {
    countLike() {
      return {
        numberOfLike: this.post.likeCounter,
        numberOfDislike: this.post.dislikeCounter,
      };
    },
  },

  created() {
    this.setPostDataFromUrlId();
  },

  mounted() {
    this.likedDisliked();
  },

  methods: {
    /* Methods qui recupere l'id du post dans l'URL, le transforme en Number pui l'enregistre dans la varible 'postId'
    Puis la methode 'getPostInfos' est appeler en passant la variable 'id' en parametre */
    setPostDataFromUrlId() {
      /* decoupe l'url et recupere uniquement la derniere partie contenant l'ID */
      const url = this.$route.path.split("/");
      /* convertis en Number le String contenant l'ID */
      const postId = parseInt(url[2]);
      /* Enregistrement de l'id dans les data qui seront eventuellement utilisé pour commenter la publication*/
      this.newComment.postId = postId;
      /* Appel de la methode getPostInfos */
      this.getPostInfos(postId);
    },

    /* Methode qui recupere grace a un appel a la BDD via l'API les informations du post */
    getPostInfos(id) {
      /* fait un appel a l'API en integrant l''id' du parametre de la fonction a l'URI */
      this.axios
        .get(`http://localHost:3000/api/post/${id}`)
        .then((res) => {
          /* enregistre TOUT le resultat dans la data 'post' */
          this.post = res.data.post;
          /* enregistre juste le contenus du post dans la data 'postUpdateData.content' qui utilisé lorsque
        l'utilisateur fait une modification de la publication, elle est alors utilisé en tant que 'value' du "textarea" */
          this.postUpdateData.content = res.data.post.content;
          this.likedDisliked();
        })
        .catch((err) => console.log(err));
    },

    addComment() {
      console.log(this.newComment);
      this.axios
        .post("http://localhost:3000/api/comment", this.newComment)
        .then(() => history.go(0))
        .catch((err) => console.log(err));
    },

    deleteComment(id) {
      this.axios
        .delete(`http://localhost:3000/api/comment/${id}`)
        .then(() => history.go(0))
        .catch((err) => console.log(err));
    },

    likedDisliked() {
      this.post.LikePosts.find((react) => {
        console.log(react);
        switch (react.value) {
          case 1:
            this.liked = true;
            break;
          case -1:
            this.disliked = true;
            break;
          case 0:
            this.disliked = false;
            this.liked = false;
            break;
          default:
            break;
        }
      });
      console.log(this.liked);
      console.log(this.disliked);
    },

    reactToPost(val) {
      let value = val;
      if (this.liked == true || this.disliked == true) {
        value = 0;
      }
      const likeDatas = {
        postId: this.post.id,
        userId: this.currentUserId,
        value,
      };
      console.log(likeDatas);
      this.axios
        .post("http://localhost:3000/api/post/like", likeDatas)
        .then(() => {
          this.getPostInfos(this.post.id);
        })
        .catch((err) => console.log(err));
    },

    /* Methode qui supprime le post dont l'id correspond a la valeur passée en paramétre */
    deletePost(id) {
      /* fait un appel a l'API en integrant l''id' du parametre de la fonction a l'URI */
      this.axios
        .delete(`http://localhost:3000/api/post/${id}`)
        .then(() =>
          this.$router.go("/home")
        ) /* redirect pour rafraichir la page (j'ai pas trouvé mieux :/) */
        .catch((err) => console.log(err));
    },

    /* Methode pour modifier la publication */
    updatePost(id) {
      const formData = new FormData();
      formData.append("content", this.postUpdateData.content);
      formData.append("imageUrlPrev", this.post.postImageUrl);
      if (this.postUpdateData.file.length != 0) {
        console.log("fichier present");
        formData.append("fileAttachment", this.postUpdateData.file);
      }
      this.axios
        .put(`http://localhost:3000/api/post/${id}`, formData)
        .then((res) => {
          console.log(res);
          this.getPostInfos(this.post.id);
        })
        .catch((err) => console.log(err));
    },

    loadAttachment(event) {
      this.postUpdateData.postImageUrl = event.target.files[0].name;
      this.postUpdateData.file = event.target.files[0];
    },

    switchUpdateMode() {
      this.update = !this.update;
    },
  },
};
</script>

<style lang="scss">
@import "../../public/style.scss";

    h1{
      width: 200px;
    position:relative;
        &::after {
          content: "";
          height: 2px;
          width: 100px;
          background: $tertiary-color;
          position: absolute;
          left: 50px;
          bottom: -5px;
        }}

.container-post-view {
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 80%;
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: center;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.post-view {
  &__title {
    margin-bottom: 5px;
    margin-top: 0px;
    padding-top: 10px;
  }
  &__subtitle {
    margin-top: 5px;
  }

  &__action {
    &__button {
      width: 70px;
      border: none;
    }
  }

  &-image-container {
    object-fit: contain;
    max-width: 100%;
    min-width: 25%;
    min-height: 50%;
    max-height: 100%;
  }
}

.post-view-card {
  &__header {
    display: flex;
    flex-direction: row-reverse;
  }

  &__body {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    &__content {
      & p {
        font-size: 30px;
      }
    }

    &__image {
      max-width: 50%;
      min-height: 300px;
      max-height: 400px;
    }
  }
  /* Bouton "COMMENTER" standard */
  & .button {
    border: none;
    padding: 5px 7px;
    width: 80%;
    height: 50px;
    font-size: 22px;
    color: $grey-light-color;
    background-color: $primary-color;
    &:hover {
      background: rgba(0, 0, 0, 0.3);
      color: $primary-color;
      transition-duration: 500ms;
      width: 85%;
      transform: scale(0.96);
    }
  }

  &__comments-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    & p {
      margin: 3px;
    }

    &__comment-card {
      border-bottom: black 1px solid;
      padding: 10px;
      margin: 5px auto;
      min-width: 50%;
      max-width: 1400px;
      min-height: 70px;

      &__author{
        color: $secondary-color
      }

      &__content {
        margin: 10px 0 10px 0;
                font-family: $primary-font;
        font-size: 18px;      }

      & .date {

        font-size: 12px
      }
    }
  }

  & form {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 20px 50px;
    margin-top: 0 !important;
    & textarea {
      width: 90%;
      resize: none;
      min-height: 100px;
      border-radius: 15px;
      font-family: $primary-font;
      font-size: 18px;
    }
  }
  /* BOUTON "PUBLIER votre commentaire" */
  & input[type="submit"] {
    font-family: $secondary-font;
    max-width: 300px;
    font-size: 16px;
    padding: 5px 15px;
    border: $primary-color 3px solid;
    cursor: pointer;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    &:hover {
      transition: 500ms;
      background-color: $primary-color;
      color: $tertiary-color;
    }
  }

  /* BOUTTON "Choisir Un fichier" */
  & input[type="file"] {
    &::-webkit-file-upload-button {
      font-family: $primary-font;
      border: none;
      padding: 5px 15px;
      background-color: $secondary-color;
      color: $grey-light-color;
      &:hover {
        transition: 500ms;
        background-color: $primary-color;
        color: $tertiary-color;
      }
    }
  }

  /* TEXTAREA Style Sup */
  /* Centrage du placeholder du TEXTAREA recevant le contenus d'un nouveau post */
  & ::-webkit-input-placeholder {
    text-align: center;
    font-family: $secondary-font;
    font-size: 1.7em;
    color: $primary-color;
  }

  /* Style de la scrollbar */
  & textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  & textarea::-webkit-scrollbar {
    position: absolute;
    right: 10px;
    width: 22px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0 30px 30px 0;
  }

  & textarea::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: $primary-color;
  }
}

</style>
