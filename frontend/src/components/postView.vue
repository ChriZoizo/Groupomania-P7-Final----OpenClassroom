<!-- * --- COMPOSANT --- : Composant affichant une seul publications et ses informations relative -->
<template>
  <section class="container-post-view container">
    <!-- TITRE -->
    <h1 class="post-view-card__title">Publication</h1>
    <!-- Subtitle + auteur de la publication (router-link) -->
    <h3 class="post-view-card__subtitle">
      <span class="bold">de </span>
      <router-link class="remove-decoration" :to="'/profil/' + post.userId">{{
        post.User.nickname || post.User.email
      }}</router-link>
    </h3>
    <!-- CARD BEGIN -->
    <div class="post-view-card shadowed" v-show="!update">
      <!-- CARD-header -->
      <div class="post-view-card__header">
        <!-- Boutons d'action  -->
        <!-- UNIQUEMENT Si l'utilisateur actuel est Administrateur, ou est l'auteur dela publication -->
        <div
          v-if="post.userId == currentUserId || userIsAdmin == 'true'"
          class="post-view-card__action"
        >
          <!-- Bouton modifier (Passe la data 'update' a true, faisant disparaitre cette section au profit de la section UPDATE) -->
          <button
            class="action-button button--main"
            v-on:click="switchUpdateMode()"
          >
            <i class="fas fa-pencil-alt fa-lg"></i>
          </button>
          <!-- Bouton supprimer -->
          <button
            class="action-button button--danger"
            v-if="post.userId == currentUserId || userIsAdmin == 'true'"
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
          <p class="post-content">{{ post.content }}</p>
        </div>
        <!-- Image de la publication si il y en as une -->
        <a
          v-if="post.postImageUrl.length > 0"
          target="tab"
          :href="post.postImageUrl"
          class="post-view-card__body__image"
        >
          <img
            :src="post.postImageUrl"
            alt="'Image contenus dans une publication'"
            class="post-view-image-container"
          />
        </a>
      </div>
      <!-- CARD-footer -->
      <div class="post-view-card__footer">
        <!-- like -->
        <div class="reaction">
          <div v-on:click="reactToPost(1)" class="reaction__button">
            <i v-bind:class="{ green: liked }" class="fas fa-thumbs-up grey"></i
            ><span class="reaction__like--counter">{{
              countLike.numberOfLike
            }}</span>
          </div>
          <!-- dislike -->
          <div v-on:click="reactToPost(-1)" class="reaction__button">
            <i
              v-bind:class="{ red: disliked }"
              class="fas fa-thumbs-down grey"
            ></i
            ><span class="reaction__dislike--counter">{{
              countLike.numberOfDislike
            }}</span>
          </div>
        </div>
        <!-- Date de creation de la publication -->
        <div class="post-view-card__footer__date">
          <p class="date">
            <span>Publié le : </span>
            {{ new Date(post.createdAt).getDate() }} /
            {{ new Date(post.createdAt).getMonth() + 1 }} /
            {{ new Date(post.createdAt).getFullYear() }}
          </p>
        </div>
      </div>
      <!-- COMMENTS SECTION -->
      <div class="comments-section">
        <button
          v-on:click="commenting = !commenting"
          v-bind:class="{ active: commenting }"
          class="comment-button button--main"
        >
          <i class="far fa-comment-alt fa-lg"></i> Commenter
        </button>
        <form
          v-show="commenting"
          @submit.prevent="addComment"
          class="comments-section__write-form"
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

        <div class="comments-section">
          <!--  COMMENT LOOP (boucle iterant sur l'Array de commentaires associés a la publication) -->

          <div
            v-for="comment in post.Comments"
            :key="comment.id"
            class="comments-section__comment-card"
          >
            <div class="comments-section__comment-card__body">
              <div class="comment-author">
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
              <div class="comment-content">
                <p>{{ comment.content }}</p>
              </div>
            </div>
            <!-- Date du commentaire -->
            <div class="comments-section__comment-card__footer">
              <p class="date">
                Le {{ new Date(post.createdAt).getDate() }} /
                {{ new Date(post.createdAt).getMonth() + 1 }} /
                {{ new Date(post.createdAt).getFullYear() }}
              </p>
              <div
                v-if="comment.User.id == currentUserId || userIsAdmin == 'true'"
                v-on:click="deleteComment(comment.id)"
                class="comments-section__comment-card__footer--delete"
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
      <h2 class="clear-text">Modification</h2>
            <p class="tuto clear-text">
        <i class="fas fa-info-circle"></i> Ici vous pouvez modifier le contenus de la publication.
      </p>
      <!-- Bouton Annulation -->
      <div class="post-update-card__action">
        <button
          class="post-update-card__action__button button--secondary"
          v-on:click="switchUpdateMode()"
        >
          Annuler
        </button>
      </div>
      <div class="post-update-card__body">
        <!--  FORM BEGIN -->
        <form @submit="updatePost(post.id)" class="post-update-form">
          <!-- inputs pour modifier le CONTENUS de la publication -->
          <div class="update-form-group">
            <!--             <label class="clear-text" for="update-content">Contenus</label>
 -->
            <textarea
              type="text"
              id="update-content"
              class="form-control"
              v-model="postUpdateData.content"
              maxlength="500"
              required
            />
          </div>
          <!-- Input pour modifier l'image associé a la publication -->
          <div class="update-form-group">
            <label
              v-if="post.postImageUrl.length > 0"
              class="clear-text"
              for="postImg"
              >Modifier l'image
            </label>
            <label v-else class="clear-text" for="postImg"
              >Ajouter une image
            </label>
            <input
              id="imageChanger"
              type="file"
              name="fileAttachment"
              class="form-control"
              accept=".jpeg, .png, .jpg .gif"
              v-on:change="loadAttachment($event)"
              data-buttonText="Bla"
            />
          </div>
          <!-- Preview Image -->
          <!-- Si le post contient deja une image, on l'affiche dans la preview -->
          <div class="post-view-card__body__image">
            <img
              v-if="post.postImageUrl.length > 0"
              :src="post.postImageUrl"
              alt="'Image actuelle de la publication'"
              id="update-previewer"
              class="post-view-image-container"
            />
            <!-- Sinon on affiche l'asset correspondant -->
            <img
              v-else
              src="../assets/no-preview.png"
              alt="'Image actuelle de la publication'"
              id="update-previewer"
              class="post-view-image-container"
            />
          </div>
          <!-- Bouton d'enregitrement des modifications -->
          <input type="submit" value="Enregistrer les modifications" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
/* --- SCRIPT --- */
export default {
  data() {
    return {
      currentUserId: parseInt(localStorage.getItem("userId")),
      userIsAdmin: localStorage.getItem("userIsAdmin"),

      commenting: false,
      update: false,

      liked: false,
      disliked: false,

      post: {},

      postUpdateData: {
        content: "",
        file: "",
      },

      newComment: {
        userId: parseInt(localStorage.getItem("userId")),
        postId: 0,
        content: "",
      },
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

  mounted() {},

  /* - METHODS - */
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
          /* enregistre juste le contenus du post dans la data 'postUpdateData.content' qui seras utilisé lorsque
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
        .then(() => this.setPostDataFromUrlId())
        .catch((err) => console.log(err));
    },

    deleteComment(id) {
      if (
        confirm(
          "Etes-vous sûr de vouloir supprimer ce commentaire ? \nToutes suppression est definitive !"
        )
      ) {
        this.axios
          .delete(`http://localhost:3000/api/comment/${id}`)
          .then(() => this.setPostDataFromUrlId())
          .catch((err) => console.log(err));
      }
    },

    likedDisliked() {
      let reaction = this.post.LikePosts.find(
        (react) =>
          react.UserId == this.currentUserId && react.PostId == this.post.id
      );
      console.log(reaction);
      if (typeof reaction !== "undefined") {
        switch (reaction.value) {
          case 1:
            this.liked = true;
            this.disliked = false;
            break;
          case -1:
            this.disliked = true;
            this.liked = false;
            break;
          case 0:
            this.disliked = false;
            this.liked = false;
            break;
          default:
            console.log("@@@@@@@@@@@@@@@@@@@@@");
            break;
        }
      } else {
        this.disliked = false;
        this.liked = false;
      }
    },

    reactToPost(val) {
      let value = val;
      if (this.liked == true || this.disliked == true) {
        value = 0;
      }
      const likeDatas = {
        postId: this.post.id,
        userId: this.currentUserId,
        value: value,
      };
      console.log("VALEUR LIKE");
      console.log(likeDatas.value);
      this.axios
        .post("http://localhost:3000/api/post/like", likeDatas)
        .then(() => {
          this.getPostInfos(this.post.id);
        })
        .catch((err) => console.log(err));
    },

    /* Methode qui supprime le post dont l'id correspond a la valeur passée en paramétre.
    Demande confirmation de l'utilisateur au prealable */
    deletePost(id) {
      /* Demande de confirmation */
      if (
        confirm(
          "Etes-vous sûr de vouloir supprimer cette publication ? \nToutes suppression est definitive !"
        )
      ) {
        /* fait un appel a l'API en integrant l''id' du parametre de la fonction a l'URI */
        this.axios
          .delete(`http://localhost:3000/api/post/${id}`)
          .then(() =>
            this.$router.go("/home")
          ) /* redirect pour rafraichir la page (j'ai pas trouvé mieux :/) */
          .catch((err) => console.log(err));
      }
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
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("update-previewer").src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },

    switchUpdateMode() {
      this.update = !this.update;
    },

    openImage(url) {
      window.open(url, "tab", "width=600,height=600");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/style.scss";

h1 {
  margin-bottom: 5px;
  margin-top: 0px;
  padding-top: 10px;
  position: relative;
  &::after {
    content: "";
    height: 2px;
    width: 4em;
    background: $tertiary-color;
    position: absolute;
    left: calc(50% - 2em);
    bottom: -5px;
  }
}

.container-post-view {
  padding: 20px 0;
  margin: auto;
  min-height: 100% !important;

  /*   background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: center; */
  @include flexCol;
  align-items: center;
}

.post-view-image-container {
}

.post-view-card {
  background-color: lighten($color: $primary-color, $amount: 80);
  min-width: 50%;

  &__header {
    display: flex;
    flex-direction: row-reverse;
    height: 40px;
    & .action-button {
      width: 40px;
      height: 40px;
      border: none;
    }
  }

  &__body {
    @include flexCol;
    align-items: center;
    flex-wrap: wrap;

    &__content {
      & .post-content {
        font-size: 30px;
      }
    }

    &__image {
      width: 100%;
      min-height: 300px;
      max-height: 550px;
      overflow: hidden;
      & img {
        object-fit: cover;
        max-width: 100%;
      }
    }
  }

  &__footer {
    @include flexRow;
    justify-content: space-between;
    width: 80%;
    margin: 7px auto;
    & .reaction {
      width: 100px;
      @include flexRow;
      &__button {
        @include flexRow;
        align-items: center;
        width: 50%;
      }
    }
  }

  /* SECTION COMMENTAIRE  */

  .comments-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & .comment-button {
      border: none;
      padding: 5px 7px;
      width: 100%;
      height: 50px;
      font-size: 22px;
    }

    & p {
      /* selectionne seulement les <p> contenus dans les commentaire */
      margin: 3px;
      padding: 0 10px;
    }

    &__comment-card {
      @include flexCol;
      justify-content: space-between;
      border-bottom: black 1px solid;
      width: 100%;
      margin: 5px auto;
      min-width: 50%;
      max-width: 1400px;
      min-height: 70px;

      &__body {
        @include flexRow;
        & .comment-author {
          color: $secondary-color;
          width: 200px;
        }

        & .comment-content {
          width: calc(100% - 200px);
          text-align: center;
          margin: 10px 0 2px 0;
          font-family: $primary-font;
          font-size: 18px;
        }
      }
      & .date {
        color: $secondary-color;
        margin-top: 0;
        text-align: left;
        font-size: 12px;
      }

      &__footer {
        position: relative;
        &--delete {
          position: absolute;
          top: -2px;
          right: 7px;
        }
      }
    }
  }
  /* COMMENT FORM STYLE */
  form {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 20px 50px;
    margin-top: 0 !important;
    & textarea {
      width: 90%;
      resize: none;
      min-height: 100px;
      border-radius: 0 0 15px 15px;
      font-family: $primary-font;
      font-size: 18px;
    }
  }
  /* Bouton "PUBLIER votre commentaire" */
  input[type="submit"] {
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

  /* Bouton "Choisir Un fichier" */
  input[type="file"] {
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
  ::-webkit-input-placeholder {
    text-align: center;
    font-family: $secondary-font;
    font-size: 1.7em;
    color: $primary-color;
  }
  /* Style de la scrollbar */
  textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    border-radius: 10px 10px;
    background-color: rgba(0, 0, 0, 0);
  }
  textarea::-webkit-scrollbar {
    position: absolute;
    right: 10px;
    width: 22px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0 30px 30px 0;
  }
  textarea::-webkit-scrollbar-thumb {
    border-radius: 0 0 10px 0px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: $primary-color;
  }
}
/* - UPDATE SECTION STYLE - */
.post-update-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 1200px !important;
  background-color: $primary-color;
  border-radius: 30px;

  &__action {
    position: relative;
    &__button {
      position: absolute;
      right: 0px;
      top: -106px;
      border:none;
      border-radius: 0 20px 0 0;
      width: 150px;
      height: 40px;
      font-size: 20px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & #update-content {
    border-radius: 30px;
    width: 100%;
  }

  & form {
    display: flex;
    flex-direction: column;
    margin: 0 15px;

    margin-top: 0 !important;
    & textarea {
      padding: 5px 7px;
      resize: none;
      min-height: 100px;
      font-family: $primary-font;
      font-size: 18px;
      border-radius: 7px !important;
    }

    & label {
      font-size: 19px;
      text-align: center;
    }
  }
  /* BOUTON "Enregistrer les modifications" */
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
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0);
  }

  & textarea::-webkit-scrollbar {
    position: absolute;
    right: 10px;
    width: 22px;
    background-color: rgba(0, 0, 0, 0.164);
    border-radius: 0 7px 7px 0;
  }

  & textarea::-webkit-scrollbar-thumb {
    border-radius: 0 5px 5px 0px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: $primary-color;
  }
}
</style>
