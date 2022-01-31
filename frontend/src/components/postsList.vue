<!-- * - COMPOSANT : Liste des publications de la BDD -->
<template>
  <div class="container-post-list">
    <!-- LOADER -->
    <div v-show="loading" class="">
      Chargement des publications ... (ANIMATION Work In Progress..)
    </div>
    <!-- LOOP (Boucle iterant sur le resultat de la methode GETALLPOST du module (Array))  -->
    <div
      v-for="(post, index) in listOfPosts"
      :key="index"
      class="post shadow-card"
    >
      <!-- CARD BEGIN-->
      <router-link class="post-card post-card--background remove-decoration" :to="'/post/' + post.id">
        <!-- CARD-header -->
        <div class="post-card__header">
          <!-- Nom (ou email) de l'utilisateur -->
          <div class="post-card__header-userName">
            <router-link
              class="remove-decoration  post-card--background bold post-card__header-userName underlined--secondary-color"
              :to="'/profil/' + post.userId"
              >{{ post.User.nickname || post.User.email }}</router-link
            >
          </div>
          <!-- Bouton DELETE -->
          <button
            v-if="post.userId == this.currentUserId || this.isAdmin == 'true'"
            class="post-card__header-action"
            v-on:click="deletePost(post.id)"
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
              v-bind:alt="
                'Image contenus dans une publication de ' + post.User.email
              "
              class="post-image-container"
            />
          </div>
        </div>
        <div v-else class="post-card__body__content-alt post-card__body">
          <div class="post-card__body ">
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
            <div v-on:click="reactToPost(1, post.id)" class="reaction__button">
              <i class="fas fa-thumbs-up grey"></i
              ><span class="reaction__like--counter">{{
                post.likeCounter
              }}</span>
            </div>
            <!-- dislike -->
            <div v-on:click="reactToPost(-1, post.id)" class="reaction__button">
              <i class="fas fa-thumbs-down grey"></i
              ><span class="reaction__dislike--counter">{{
                post.dislikeCounter
              }}</span>
            </div>
          </div>
        </div>
      </router-link>
      <!-- CARD END -->

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
                {{ comment.User.nickname || comment.User.email }} à dit
                :</router-link
              >
            </div>
            <div class="post-card__comments-section__comments__right-content">
              {{ comment.content }}
            </div>
          </div>
        </div>
      </div>
      <!-- CARD APPEND END -->
    </div>
  </div>
</template>

<script>
export default {
  name: "postList",

  /* DATA :  variables */
  data() {
    return {
      /* loading: boolean definissant si le composantr charge des elements (modifié via les METHODS) */
      loading: true,
      /* listOfPosts: Objet qui Contiendras tous les posts en BDD renvoyé par la methods getAllPost() */
      listOfPosts: {},

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
  /* CREATED : appel la method 'setLocalStorageValue' lorsque le composant est rendu pour declarer en Datas
  des informations sur l'utilisateur connecté*/
  created() {
    this.setLocalStorageValue();
  },

  /* BEFOREMONT : Appel la methode 'getAllPostAndSetDatas' qui recupere tout les Posts via un apperl a l'API,
les enregistre dans la Data 'listsOfPosts' et créer des datas necessaires */
  beforeMount() {
    this.getAllPostAndSetData();
  },

  /* METHODS */
  methods: {
    /* getAllPostAndSetData: recupere tout les POSTs en BDD via appel a API. 
    Puis créer les datas qui serviront aux formulaires de commentaires. Sans cela, ils seraient tous liés
    Enfin, change le data 'loading' en false */
    getAllPostAndSetData() {
      /*  Appel a l'API */
      this.axios
        .get("http://localhost:3000/api/post/")
        .then((posts) => {
          /* Puis, enregistrement des posts reçus dans la data 'listOfPosts' */
          this.listOfPosts = posts.data.posts;
          /* Loop "for...in" sur la Data Array contenant TOUT les Posts) 
        Et nous allons créer, pour chaque post, une entrée dans notre Data 'comments', qui serviras de point d'ancrage pour
        les formulaire de commentaires. En effet, chaque Post auras sa propre entrée dans la Data 'comments' ayant l'ID du post comme Key 
        (PS: desolé pour le mal de tête)*/
          for (const post of this.listOfPosts) {
            console.log(post);
            /* recuperation de l'ID du post qui servira de "key" */
            let index = post.Id;
            /* Ajout de l'Objet Vide dans 'initialiBoard'*/
            this.comments[index];
          }
        })
        .then(() => (this.loading = false))
        .catch((err) => console.log(err));
      /* passe la Data Booleen 'loading' en false */
    },

    deletePost(id) {
      this.axios
        .delete(`http://localhost:3000/api/post/${id}`)
        .then(() => {
          console.log("POST DELETED");
          this.$router.go("/home");
        })
        .catch((err) => console.log(err));
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

    checkReact(post) {
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
    },

    setLocalStorageValue() {
      this.currentUserId = localStorage.getItem("userId");
      this.isAdmin = localStorage.getItem("userIsAdmin");
    },
  },
};
</script>

<style lang="scss">
@import "../../public/style.scss";

.post {
  margin: 35px 0;
  border-radius: 30px 30px 0px 0px;

  &-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    padding: 5px 5px 5px 5px;
    min-height: 200px;
    background-color: lighten($color: $grey-light-color, $amount: 20);
    border-radius: 30px 30px 0px 0px;
    overflow: hidden;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 28px 28px 0px 0px;
      height: 50px;
      padding: 0 40px 0 25px;
      /*       background-color: lighten($color: $primary-color, $amount: 70); */
      &-userName {
        font-family: $secondary-font;
        font-size: 24px;
      }

      &-action {
        border: none;
        width: 30px;
                background-color: lighten($color: $primary-color, $amount: 80);
      }
    }

    &__body {
      padding: 15px 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      & p {
        font-size: 28px;
      }
      &__image {
        margin: 0 0 0 15%;
      }

      &__content-alt{
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
          width: 90%;
          resize: none;
        }
      }
      &__comments {
        font-family: $primary-font;
        background-color: lighten($color: $primary-color, $amount: 80);
        border: $primary-color 1px solid;
        justify-content: space-between;
        padding: 4px 10%;
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
        }
      }
    }

    &--background {
        background-color: lighten($color: $primary-color, $amount: 80);
    }
  }

  &-image-container {
    max-width: 100em;
    max-height: 10em;
    object-fit: contain;
  }

  & .reaction {
    &__button {
      min-width: 60px;
      min-height: 25px;
    }
  }
}
</style>
