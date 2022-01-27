<!-- * - COMPOSANT : View d'une publication -->
<template>
  <section class="container-post-view">
    <!-- CARD BEGIN -->
    <div class="post-view-card" v-if="update == false">
      <!-- CARD-header -->
      <div class="post-view-card__header">
        <!-- Image de pofil -->
        <div class="post-view-card__header__profilImg">
          <img
            class="post-card__header-profilImg container-sm"
            src="../assets/default_profil_image.png"
          />
        </div>
        <div class="post-view-card__header__userName">
          <!-- Nom : Si l'auteur a rensigné un nom et/ou prenom, celui-ci s'affiche -->
          <router-link
            class="remove-decoration"
            v-if="this.post.User.nickname != null"
            :to="'/profil/' + this.post.userId"
            >{{ this.post.User.nickname }}</router-link
          >
          <!-- SINON affiche l'email -->
          <router-link
            class="remove-decoration"
            v-else
            :to="'/profil/' + this.post.userId"
            >{{ this.post.User.email }}</router-link
          >
        </div>
        <!-- Boutons d'action  -->
        <!-- UNIQUEMENT Si l'utilisateur actuel est Administrateur, ou est l'auteur dela publication -->
        <div
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
          class="post-view-action"
        >
          <!-- Bouton suprrimer -->
          <button
            class="post-view-action__button"
            v-if="
              this.post.userId == this.currentUserId || this.isAdmin === true
            "
            onclick="return confirm('Etes-vous sûr de vouloir supprimer cette publication ?')"
            v-on:click="deletePost(this.post.id)"
          >
            Supprimer le post
          </button>
          <!-- Bouton modifier (Passe la data 'update' a true, faisant disparaitre cette section au profit de la section UPDATE) -->
          <button
            class="post-view-action__button"
            v-on:click="switchUpdateMode()"
          >
            Modifier
          </button>
        </div>
      </div>
      <!-- CARD-body -->
      <div class="post-view-card__body">
        <!-- contenus de la publication -->
        <div class="post-view-card__body__content">
          <p>{{ this.post.content }}</p>
        </div>
        <!-- Image de la publication si il y en as une -->
        <div
          v-if="post.postImageUrl.length > 0"
          class="post-view-card__body__image"
        >
          <a :href="post.postImageUrl"
            ><img
              :src="this.post.postImageUrl"
              v-bind:alt="'Image contenus dans une publication'"
              class="post-image-container"
          /></a>
        </div>
      </div>
      <!-- CARD-footer -->
      <div class="post-card__footer">
        <!-- Date de creation de la publication -->
        <div class="post-card__footer__date">
          <p class="date">
            date du post : {{ new Date(this.post.createdAt).getDate() }} /
            {{ new Date(this.post.createdAt).getMonth() + 1 }} /
            {{ new Date(this.post.createdAt).getFullYear() }}
          </p>
        </div>
        <!-- like -->
        <div class="post-card__footer reaction">
          <div
            v-on:click="reactToPost(1)"
            class="post-card__footer reaction__like"
          >
            <i
              v-bind:class="{ grey: liked, green: !liked }"
              class="fas fa-thumbs-up green"
            ></i
            ><span class="reaction__like--counter">{{ post.likeCounter }}</span>
          </div>
          <!-- dislike -->
          <div
            v-on:click="reactToPost(-1)"
            class="post-card__footer reaction__dislike"
          >
            <i
              v-bind:class="{ grey: disliked, red: !disliked }"
              class="fas fa-thumbs-down red"
            ></i
            ><span class="reaction__dislike--counter">{{
              post.dislikeCounter
            }}</span>
          </div>
        </div>
      </div>
      <!-- COMMENTS SECTION -->
      <div class="post-card__comments-section">
        <button v-on:click="commenting = !commenting" class="button">
          Commenter
        </button>
        <form
          v-show="commenting"
          @submit.prevent="addComment"
          class="post-card__comments-section__write-form"
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

        <!--  COMMENT LOOP (boucle iterant sur l'Array de commentaires associés a la publication) -->
        <div
          v-for="(comment, index) in post.Comments"
          :key="index"
          class="post-card__comments-section__post-card"
        >
          <div class="post-card__comments-section__comment-card__author">
            <!-- Prenom OU nom OU email de l'auteur du commentaire -->
            <router-link
              class="remove-decoration"
              :to="'/profil/' + comment.User.id"
              ><p>
                {{ comment.User.nickname || comment.User.email }}
              </p></router-link
            >
          </div>
          <!-- Contenus du commentaire -->
          <div class="post-card__comments-section__comment-card__content">
            {{ comment.content }}
          </div>
          <!-- Date du commentaire -->
          <div class="post-card__comments-section__comment-card__footer">
            <p class="date">
              {{ new Date(this.post.createdAt).getDate() }} /
              {{ new Date(this.post.createdAt).getMonth() + 1 }} /
              {{ new Date(this.post.createdAt).getFullYear() }}
            </p>
            <div
              v-if="comment.User.id == currentUserId || userIsAdmin == 'true'"
              v-on:click="deleteComment(comment.id)"
              onclick="return confirm('Etes-vous sûr d'effacer ce commentaire ?)"
              class="post-card__comments-section__comment-card__footer-delete"
            >
              <i class="fas fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- !!! UPDATE SECTION !!! ne s'affiche que lorsque la data 'update' passe a true, faisant disparaitre la section CARD-POST -->
    <div class="post-update-card" v-show="update">
      <div class="post-update-card__body">
        <!--  FORM BEGIN -->
        <form
          @submit.prevent="updatePost(post.id)"
          class="post-update-form__content"
        >
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
      <div class="post-update-action">
        <button
          class="post-update-action__button"
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

      post: "",
    };
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
      this.axios.get(`http://localHost:3000/api/post/${id}`).then((res) => {
        /* enregistre TOUT le resultat dans la data 'post' */
        this.post = res.data.post;
        /* enregistre juste le contenus du post dans la data 'postUpdateData.content' qui utilisé lorsque
        l'utilisateur fait une modification de la publication, elle est alors utilisé en tant que 'value' du "textarea" */
        this.postUpdateData.content = res.data.post.content;
      });
    },

    addComment() {
      console.log(this.newComment);
      this.axios
        .post("http://localhost:3000/api/comment", this.newComment)
        .then(() => history.go(0));
    },

    deleteComment(id) {
      this.axios
        .delete(`http://localhost:3000/api/comment/${id}`)
        .then(() => history.go(0));
    },

    likedDisliked() {
      this.post.LikePosts.find((react) => {
        switch (react.value) {
          case 1:
            this.liked = !this.liked;
            break;
          case -1:
            this.disliked = !this.disliked;
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
        .then(() => {});
      history.go(0);
    },

    /* Methode qui supprime le post dont l'id correspond a la valeur passée en paramétre */
    deletePost(id) {
      /* fait un appel a l'API en integrant l''id' du parametre de la fonction a l'URI */
      this.axios
        .delete(`http://localhost:3000/api/post/${id}`)
        .then(() =>
          this.$router.go("/home")
        ); /* redirect pour rafraichir la page (j'ai pas trouvé mieux :/) */
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
          this.$router.go(`/home/${id}`);
        });
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
.green {
  color: green;
}

.grey {
  color: grey !important;
}
</style>
