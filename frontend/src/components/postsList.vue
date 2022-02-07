<!-- * - COMPOSANT : Liste des publications de la BDD -->
<template>
  <section class="container-post-list container">
    <!-- LOADER -->
    <div v-show="!dataReady" class="loader">
      <div class="loader__container">
        <div class="loader__container__element"></div>
        <div class="loader__container__element2"></div>
        <p class="loader__container__text">{{ loaderMessage }}</p>
      </div>
    </div>
    <div class="">
      <h2 class="">Liste des publications</h2>
    </div>
    <!-- LOOP (Boucle iterant sur le resultat de la methode GETALLPOST du module (Array))  -->
    <div v-if="(dataReady = true)">
      <div
        v-for="(post, index) in this.postsArray"
        :key="index"
        class="post shadow-card"
      >
        <!-- CARD BEGIN-->
        <router-link
          class="post-card post-card--background remove-decoration"
          :to="'/post/' + post.id"
        >
          <!-- CARD-header -->
          <div class="post-card__header">
            <!-- Nom (ou email) de l'utilisateur -->
            <div class="post-card__header-userName">
              <router-link
                class="remove-decoration post-card--background bold post-card__header-userName underlined--secondary-color"
                :to="'/profil/' + post.userId"
                >{{ post.User.nickname || post.User.email }}</router-link
              >
            </div>
            <!-- Bouton DELETE -->
            <button
            pre
              v-if="post.userId == this.currentUserId || this.isAdmin == 'true'"
              class="post-card__header-action"
              v-on:click.prevent="deletePost(post.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <!-- BODY DE CARD -->
          <!-- Contenus -->
          <!--  SI il y a une image lié affiche cette DIV contenant le content et l'image du Post -->
          <div v-if="post.postImageUrl.length != 0" class="post-card__body">
            <div class="post-card__body__content">
              <p>{{ post.content }}</p>
            </div>
            <!-- Image de la publication -->
            <div class="post-card__body__image">
              <img
                :src="post.postImageUrl"
                alt="
                'Image contenus dans une publication de ' + post.User.email
              "
                class="post-image-container"
              />
            </div>
          </div>
          <div v-else class="post-card__body__content-alt post-card__body">
            <div class="post-card__body">
              <p>{{ post.content }}</p>
            </div>
          </div>
          <div class="post-card__footer">
            <div class="post-card__footer__date">
              <p>
                <span>Publiée le : </span>
                {{ new Date(post.createdAt).getDate() }} /
                {{ new Date(post.createdAt).getMonth() + 1 }} /
                {{ new Date(post.createdAt).getFullYear() }}
              </p>
            </div>
            <!-- Bouton de like et dislike -->
            <!-- like -->
            <div class="post-card__footer__reaction flex-row">
              <div
                v-on:click="reactToPost(1, post.id)"
                class="reaction__button"
              >
                <i class="fas fa-thumbs-up grey"></i
                ><span class="reaction__like--counter">{{
                  post.likeCounter
                }}</span>
              </div>
              <!-- dislike -->
              <div
                v-on:click="reactToPost(-1, post.id)"
                class="reaction__button"
              >
                <i class="fas fa-thumbs-down grey"></i
                ><span class="reaction__dislike--counter">{{
                  post.dislikeCounter
                }}</span>
              </div>
            </div>
          </div>
        </router-link>

        <!-- CARD APPEND Comments -->
        <!-- Ecrire un commentaire -->
        <div class="post-card__comments-section">
          <form
            @submit.prevent="addComment(post.id)"
            class="post-card__comments-section__write-form"
            id="form-comment-postList"
          >
            <textarea
              name="comment"
              id="comment"
              v-model="comments[post.id]"
              placeholder="Commentez cette publication..."
              maxlength="200"
              required
            ></textarea>
            <input type="submit" value="Publier votre commentaire" />
          </form>
          <!-- Liste des commentaires de la publications -->
          <div
            v-if="post.Comments.length != 0"
            class="post-card__comments-section"
          >
            <div
              class="post-card__comments-section__comments flex-row"
              v-for="(comment, index) in post.Comments.slice(-3)"
              :key="index"
            >
              <div class="post-card__comments-section__comments__left-author">
                <router-link
                  class="remove-decoration"
                  :to="'/post/' + comment.UserId"
                  ><i class="far fa-comments"></i> -
                  {{ comment.User.nickname || comment.User.email }}</router-link
                >
              </div>
              <div class="post-card__comments-section__comments__right-content">
                {{ comment.content }}
              </div>
            </div>
            <router-link
              class="post-card--background remove-decoration"
              :to="'/post/' + post.id"
            >
              <div
                class="post-card__comments-section__comments click-append"
                v-if="post.Comments.length > 3"
              >
               ...
              </div>
            </router-link>
          </div>
        </div>
        <!-- CARD APPEND END -->
        <!-- CARD END -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "postList",

  props: ["loaderMessage", "postsArray"],

  /* DATA :  variables */
  data() {
    return {
      /* dataReady: boolean definissant si toutes les données ont été definis et telechargés */
      dataReady: false,

      /* Valeurs recuperés dans le localStorage les infos enregistré lors de la connexion du user ( Script de app.vue) */
      /* Contient l'ID de l'utilisateur */
      currentUserId: parseInt(localStorage.getItem("userId")),
      /* userIsAdmin: Contient le booleen definisant si le user est ADMIN  */
      isAdmin: localStorage.getItem("userIsAdmin"),

      /* Objet vide qui contiendras les "slots" pour les commentaires des Posts (sans cela, tout les forms ont le même contenus) */
      comments: {},
    };
  },

  /* HOOK DE CYCLE DE VIE */
  beforeMount() {
    /*  this.createCommentsSlot(); */
  },

  mounted() {
    this.createCommentsSlot();
  },

  /* METHODS */
  methods: {
    /* createCommentsSlot: recupere la props 'postArray' (Array contenant les Posts a afficher). 
    Puis créer les datas qui serviront aux formulaires de commentaires en iterant sur la props 'postArray'. Sans cela, ils seraient tous liés
    Enfin, change le data 'loading' en false */
    createCommentsSlot() {
      for (const post of this.postsArray) {
        console.log(post.id);
        /* recuperation de l'ID du post qui servira de "key" */
        let index = post.id;
        /* Ajout de l'Objet Vide dans 'initialiBoard'*/
        this.comments[index] = "";
      }
      if (this.comments.length > 0) {
        this.dataReady = true;
      }
    },

    deletePost(id) {
      if (
        confirm(
          "Etes-vous sûr de vouloir supprimer ce commentaire ? \nToutes suppression est definitive !"
        )
      ) {
        this.axios
          .delete(`http://localhost:3000/api/post/${id}`)
          .then(() => {
            console.log("POST DELETED");
            history.go(0);
          })
          .catch((err) => console.log(err));
      }
    },

    addComment(id) {
      let newComment = {
        userId: this.currentUserId,
        content: this.comments[id],
        postId: id,
      };

      console.log(this.comments);
      console.log(this.comments[id]);
      this.axios
        .post("http://localhost:3000/api/comment", newComment)
        .then(() => history.go(0))
        .catch((err) => console.log(err));
    },

    reactToPost(val, postId) {
      let value = val;
      if (this.liked == true || this.disliked == true) {
        value = 0;
      }
      const likeDatas = {
        postId: postId,
        userId: this.currentUserId,
        value,
      };
      console.log(likeDatas);
      this.axios
        .post("http://localhost:3000/api/post/like", likeDatas)
        .then(() => {
          history.go(0);
        })
        .catch((err) => console.log(err));
    },

    /*     checkReact(post) {
      post.LikePosts.find((react) => {
        if (react.UserId == this.currentUserId) {
          switch (react.value) {
            case 1:
              return { like: true, dislike: false };

            case -1:
              return { like: false, dislike: true };

            default:
              return { like: false, dislike: false };
          }
        }
      });
    }, */

    /*     setLocalStorageValue() {
      this.currentUserId = localStorage.getItem("userId");
      this.isAdmin = localStorage.getItem("userIsAdmin");
    }, */
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/style.scss";



.container-post-list {
  margin-top: 40px;
}

.title {
  position: absolute;
}

.post {
  margin: 35px 0;

  &-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    min-height: 200px;
    background-color: lighten($color: $grey-light-color, $amount: 20);

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      /*       background-color: lighten($color: $primary-color, $amount: 70); */
      &-userName {
        font-family: $secondary-font;
        font-size: 24px;
        margin-left: 20px;
      }

      &-action {
        border: none;
        width: 30px;
        background-color: $primary-color;
        color: white;
        height: 100%;
        width: 50px;
        z-index: 4;
      }
    }

    &__body {
      padding: 15px 0px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      & p {
        font-size: 28px;
      }

      &__content {
        margin: 0 20px;
        text-align: center;
        min-width: 90%;
      }
      &__image {
        width: 100%;
        align-items: center;
        margin: 0 auto;
        & img {
          width: 100%;
          max-height: 500px;
          object-fit: cover;
        }
      }

      &__content-alt {
        justify-content: center !important;
      }
    }

    &__footer {
      padding: 0 30px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;

      &__reaction {
        min-width: 120px;
        justify-content: space-between;
      }

      &__date {
        & span {
          font-size: 13px;
        }
      }
    }

    &__comments-section {
      & form {
        display: flex;
        margin-top: 0 !important;
        & textarea {
          width: 95%;
          resize: none;
        }
      }
      &__comments {
        font-family: $primary-font;
        background-color: lighten($color: $primary-color, $amount: 80);
        border: $primary-color 1px solid;
        justify-content: space-between;
        padding: 4px 5%;
        &__left-author {
          color: $secondary-color;
          min-width: 15%;
          font-family: $secondary-font;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        &__right-content {
          width: 75%;
          font-size: 15px;
          white-space: pre-wrap; /* CSS3 */
          white-space: -moz-pre-wrap; /* Firefox */
          white-space: -o-pre-wrap; /* Opera 7 */
          word-wrap: break-word;
          position: relative;
          &::after {
            content: "";
            border: black 1px solid;
            width: 0px;
            height: 100%;
            position: absolute;
            left: -5px;
            bottom: 0;
          }
        }
      }

      & .click-append {
        background-color: $primary-color;
        color: white
      }
    }

    &--background {
      background-color: lighten($color: $primary-color, $amount: 80);
    }
  }

  & textarea {
    font-size: 15px !important;
  }

  & input[type="submit"] {
    font-size: 15px;
    &:hover {
      transition: 500ms;
      background-color: $primary-color;
      color: $tertiary-color;
    }
  }

  & .reaction {
    &__button {
      min-width: 60px;
      min-height: 25px;
    }
  }
}

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
