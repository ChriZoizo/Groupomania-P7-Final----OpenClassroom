<!-- * - COMPOSANT : View d'une publication -->
<template>
  <section class="container-postView">
    <!-- CARD BEGIN -->
    <div class="postView-card" v-if="update == false">
      <!-- CARD-header -->
      <div class="postView-card__header">
        <!-- Image de pofil -->
        <div class="postView-card__header__profilImg">
          <img
            class="post-card__header-profilImg container-sm"
            src="../assets/default_profil_image.png"
          />
        </div>
        <div class="postView-card__header__userName">
          <!-- Nom : Si l'auteur a rensigné un nom et/ou prenom, celui-ci s'affiche -->
          <router-link
            v-if="this.post.User.firstName != null"
            :to="'/profil/' + this.post.userId"
            >{{ this.post.User.firstName }}
            {{ this.post.User.lastName }}</router-link
          >
          <!-- SINON affiche l'email -->
          <router-link v-else :to="'/profil/' + this.post.userId">{{
            this.post.User.email
          }}</router-link>
        </div>
        <!-- Boutons d'action  -->
        <!-- UNIQUEMENT Si l'utilisateur actuel est Administrateur, ou est l'auteur dela publication -->
        <div
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
          class="postView-action"
        >
          <!-- Bouton suprrimer -->
          <button
            class="postView-action__button"
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
            class="postView-action__button"
            v-on:click="switchUpdateMode()"
          >
            Modifier
          </button>
        </div>
      </div>
      <!-- CARD-body -->
      <div class="postView-card__body">
        <!-- contenus de la publication -->
        <div class="postView-card__body__content">
          <p>{{ this.post.content }}</p>
        </div>
        <!-- Image de la publication si il y en as une -->
        <div class="postView-card__body__image">
          <img
            :src="this.post.postImageUrl"
            v-bind:alt="'Image contenus dans une publication'"
            class="post-image-container"
          />
        </div>
      </div>
      <!-- CARD-footer -->
      <div class="post-card__footer">
        <!-- Date de creation de la publication -->
        <div class="post-card__footer__date">
          <p>
            date du post : {{ new Date(this.post.createdAt).getDate() }} /
            {{ new Date(this.post.createdAt).getMonth() + 1 }} /
            {{ new Date(this.post.createdAt).getFullYear() }}
          </p>
        </div>
        <!-- Bouton de like -->
        <div class="post-card__footer__reaction">
          <div v-on:click="reactToPost(1)" class="post-card__footer__reaction__like">
            <i
            v-bind:class="{ grey: liked, green: !liked }"
              class="fas fa-thumbs-up green"
            ></i>
          </div>
          <!-- Bouton de dislike -->
          <div v-on:click="reactToPost(-1)" class="post-card__footer__reaction__dislike">
            <i
              v-bind:class="{ grey: disliked, red: !disliked }"
              class="fas fa-thumbs-down red"
            ></i>
          </div>
        </div>
      </div>
      <!-- CARD COMMENTS SECTION -->
      <div class="post-card__comments-section">
        <!--  LOOP (boucle iterant sur l'Array de commentaires associés a la publication) -->
        <div
          v-for="(comment, index) in post.Comments"
          :key="index"
          class="post-card__comments-section__post-card"
        >
          <div class="post-card__comments-section__comment-card__author">
            <!-- Prenom OU nom OU email de l'auteur du commentaire -->
            <router-link :to="'/profil/' + comment.User.id"
              ><p>
                {{
                  comment.User.firstName ||
                  comment.User.lastName ||
                  comment.User.email
                }}
              </p></router-link
            >
          </div>
          <!-- Contenus du commentaire -->
          <div class="post-card__comments-section__comment-card__content">
            {{ comment.content }}
          </div>
          <!-- Date du commentaire -->
          <div class="post-card__comments-section__comment-card__date">
            <div class="post-card__footer">
              <p>
                {{ new Date(this.post.createdAt).getDate() }} /
                {{ new Date(this.post.createdAt).getMonth() + 1 }} /
                {{ new Date(this.post.createdAt).getFullYear() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- !!! UPDATE SECTION !!! ne s'affiche que lorsque la data 'update' passe a true, faisant disparaitre la section CARD-POST -->
    <div class="postUpdate-card" v-if="update == true">
      <div class="postUpdate-card__body">
        <!--  FORM BEGIN -->
        <form
          @submit.prevent="updatePost(post.id)"
          class="postUpdate-form__content"
        >
          <!-- inputs pour modifier le CONTENUS de la publication -->
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
      <div class="postUpdate-action">
        <button
          class="postUpdate-action__button"
          v-if="this.post.userId == this.currentUserId || this.isAdmin === true"
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
      update: false,
      currentUserId: Number.parseInt(localStorage.getItem("userId")),
      isAdmin: localStorage.getItem('userIsAdmin'),

      liked: false,
      disliked: false,

      postUpdateData: {
        content: "",
        file: "",
      },

      post: "",
    };
  },

  created() {
    this.setPostDataFromUrlId();
  },

  mounted() {
        this.likedDisliked() 
  },

  methods: {
    /* Methods qui appelle deux autres methods afin de recuperer les infos du post grace a l'id contenus dans l'URL
    La premiere methode recupere l'ID et nous l'enregistrons dans une variable
    Puis la methode 'getPostInfos' est appeler en passant la variable 'id' en parametre */
    setPostDataFromUrlId() {
      const id = this.getUrlId();
      this.getPostInfos(id);
    },

    /* Methods qui renvoie l'id contenus a la fin de l'URL */
    getUrlId() {
      /* decoupe l'url */
      const url = this.$route.path.split("/");
      /* convertis en Number le String contenant l'ID */
      const postId = parseInt(url[2]);
      return postId;
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

    likedDisliked() {
      this.post.LikePosts.find(obj => {
        if (obj.UserId == this.currentUserId){
          if (obj.value == 1){
            this.liked = !this.liked
          }
          else if (obj.value == -1){
            this.disliked = !this.disliked
          }
        }

      })
          console.log(this.liked)
        console.log(this.disliked)
    },

    reactToPost(val) {
      let value = val
      if (this.liked == true || this.disliked == true ) {
        value = 0
      }
      const likeDatas = {
        postId: this.post.id,
        userId: this.currentUserId,
        value
      }
      this.axios.post('http://localhost:3000/api/post/like', likeDatas )
      .then(() => {
        })
          this.$router.go(`/post/${this.post.id}`) 
    },

    /* Methode qui supprime le post dont l'id correspond a la valeur passée en paramétre */
    deletePost(id) {
      /* fait un appel a l'API en integrant l''id' du parametre de la fonction a l'URI */
      this.axios
        .delete(`http://localhost:3000/api/post/${id}`)
        .then(() => this.$router.go("/home")); /* redirect pour rafraichir la page (j'ai pas trouvé mieux :/) */
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
  color: grey !important
}
</style>
