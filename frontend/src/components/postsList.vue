<!-- * - COMPOSANT : Liste des publications de la BDD -->
<template>
  <div class="container-post-list">
    <!-- LOADER -->
    <div v-if="loading" class="">Chargement des publications ...</div>
    <!-- LOOP (Boucle iterant sur le resultat de la methode GETALLPOST du module (Array))  -->
    <div v-for="(post, index) in listOfPosts" :key="index" class="post">
      <!-- CARD BEGIN-->
      <router-link class="post-card remove-decoration" :to="'/post/' + post.id">
        <!-- CARD-header -->
        <div class="post-card__header">
          <!-- Image de pofil -->
          <div class="post-card__header-profilImg">
            <img
              class="post-card__header-profilImg container-sm"
              src="../assets/default_profil_image.png"
            />
          </div>
          <!-- Nom (ou email) de l'utilisateur -->
          <div class="post-card__header-userName">
            <router-link
              class="remove-decoration"
              v-if="post.User.nickname != undefined"
              :to="'/profil/' + post.userId"
              >{{ post.User.nickname}}</router-link
            >
            <router-link
              class="remove-decoration"
              v-else
              :to="'/profil/' + post.userId"
              >{{ post.User.email }}</router-link
            >
          </div>
          <!-- Bouton DELETE -->
          <button
            v-if="post.userId == this.currentUserId || this.isAdmin == 'true'"
            class="post-card__header-action"
            v-on:click="deletePost(post.id)"
          >
            X ( delete )
          </button>
        </div>
        <!-- BODY DE CARD -->
        <!-- Contenus -->
        <div class="post-card__body">
          <div class="post-card__body__content">
            <p>{{ post.content }}</p>
          </div>
          <!-- Image de la publication -->
          <div class="post-card__body__image">
            <img
              v-if="post.postImageUrl.length != 0"
              :src="post.postImageUrl"
              v-bind:alt="
                'Image contenus dans une publication de ' + post.User.email
              "
              class="post-image-container"
            />
          </div>
        </div>
        <div class="post-card__footer">
          <div class="post-card__footer__date">
            <p>
              Publié le : {{ new Date(post.createdAt).getDate() }} /
              {{ new Date(post.createdAt).getMonth() + 1 }} /
              {{ new Date(post.createdAt).getFullYear() }}
            </p>
          </div>
          <!-- Bouton de like et dislike -->
        <!-- like -->
        <div class="post-card__footer reaction">
          <div
            v-on:click="reactToPost(1, post.id)"
            class="post-card__footer reaction__like"
          >
            <i
 
              class="fas fa-thumbs-up green"
            ></i><span class="reaction__like--counter">{{post.likeCounter}}</span> 
          </div>
          <!-- dislike -->
          <div
            v-on:click="reactToPost(-1, post.id)"
            class="post-card__footer reaction__dislike"
          >
            <i
              class="fas fa-thumbs-down red"
            ></i><span class="reaction__dislike--counter">{{post.dislikeCounter}}</span>
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
        >
          <textarea
            name="comment"
            id="comment"
            v-model="comments[post.id]"
            placeholder="Commentez cette publication"
            maxlength="200"
            required
          ></textarea>
          <input type="submit" value="Publier votre commentaire" />
        </form>
        </div>
        <!-- Liste des commentaires de la publications -->
        <div v-if="post.Comments.length != 0" class="post-card__append-comments">
          <div class="post-card__append-comments__comment"
          v-for="(comment, index) in post.Comments.slice(-3)" :key="index">
          <div class="post-card__append-comments__comment__left-author">{{comment.User.nickname || comment.User.email}}</div>
          <div class="post-card__append-comments__comment__right-content">{{comment.content}}</div>
          </div>
        </div>
      <!-- CARD APPEND END -->
    </div>
    <button v-on:click="test">cdlkfpfpref</button>
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
            comments: {
              },
            
    };
  },

  /* HOOK DE CYCLE DE VIE */
  /* CREATED : appel la method 'setLocalStorageValue' lorsque le composant est rendu pour declarer en Datas
  des informations sur l'utilisateur connecté*/
  created() {
    this.setLocalStorageValue()
  },

/* BEFOREMONT : Appel la methode 'getAllPostAndSetDatas' qui recupere tout les Posts via un apperl a l'API,
les enregistre dans la Data 'listsOfPosts' et créer des datas necessaires */
  beforeMount() {
     this.getAllPostAndSetData()
  },


  /* METHODS */
  methods: {
       /* getAllPostAndSetData: recupere tout les POSTs en BDD via appel a API. 
    Puis créer les datas qui serviront aux formulaires de commentaires. Sans cela, ils seraient tous liés
    Enfin, change le data 'loading' en false */
    getAllPostAndSetData() {
      /*  Appel a l'API */
      this.axios.get("http://localhost:3000/api/post/").then((posts) => {
        /* Puis, enregistrement des posts reçus dans la data 'listOfPosts' */
        this.listOfPosts = posts.data.posts;
        /* Loop "for...in" sur le resultat de la promise (Array contenant TOUT les Posts) 
        Et nous allons créer, pour chaque post, une entrée dans notre Data 'comments', qui serviras de point d'ancrage pour
        les formulaire de commentaires. En effet, chaque Post auras sa propre entrée dans la Data 'comments' ayant l'ID du post comme Key 
        (PS: desolé pour le mal de tête)*/
        for (const post of this.listOfPosts ) {
          console.log(post)
          /* recuperation de l'ID du post qui servira de "key" */
          let index = post.Id
          /* Ajout de l'Objet Vide dans 'initialiBoard'*/
         this.comments [index]
        }
      });
        /* passe la Data Booleen 'loading' en false */
        this.loading = false;
    },

    deletePost(id) {
      this.axios.delete(`http://localhost:3000/api/post/${id}`).then(() => {
        console.log("POST DELETED");
        this.$router.go("/home");
      });
    },

    addComment(id) {
      let newComment = {userId: this.currentUserId, content: this.comments[id], postId: id}

      console.log(this.comments)
      console.log(this.comments[id]);
      this.axios
        .post("http://localhost:3000/api/comment", newComment)
       .then(() => history.go(0)); 
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
        .then(() => {});
      history.go(0);
    },

    checkReact(post) {
      post.LikePosts.find((react) => {
        if (react.UserId == this.currentUserId) {
          switch (react.value) {
          case 1:
            return {like: true, dislike : false} 

          case -1:
            return {like: false, dislike: true}

          default:
            return {like: false, dislike: false}
        }
        }
      })
    },

    setLocalStorageValue() {
      this.currentUserId = localStorage.getItem("userId");
      this.isAdmin = localStorage.getItem("userIsAdmin");
    }
  },
};
</script>

<style lang="scss">
/* .post {
  &-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid black;
    padding: 5px 5px 5px 5px;
    margin: 5px 0;
    max-height: 350px;
    min-height: 200px;
    &__header {
      display: flex;
      justify-content: space-between;
      height: 75px;
      background-color: rgb(252, 241, 228);
      &-profilImg {
        height: 100%;
      }
    }
  }

  &-image-container {
    max-width: 100em;
    max-height: 10em;
    object-fit: scale-down;
  }
}
 */
</style>
