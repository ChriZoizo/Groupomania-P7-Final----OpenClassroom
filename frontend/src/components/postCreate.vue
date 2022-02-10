<template>
  <div class="form-create-post">
    <div class="text-center"  v-if="isWriting == false">
      <button
        v-on:click="isWriting = !isWriting"
        class="form-create-post__button-init button-shadow button--main"
      >
        Ecrire une publication
      </button>
    </div>
    <div class="text-center" v-if="isWriting == true">
      <div class="form-create-post__header">
        <button
          v-on:click="isWriting = !isWriting"
          class="form-create-post__button-init button-shadow button--main"
        >
          Fermer le formulaire
        </button>
        <h2>Formulaire de publication</h2>
      </div>
      <form @submit.prevent="submitPost" class="form-create-post__formular">
        <div class="form-group">
          <textarea
            type="text"
            id="Content"
            name="Content"
            class="form-control form-create-post__formular__content-input"
            v-model="postCreateInput.content"
            placeholder="Que voulez-vous partager ? ( 500 caractéres maximum )"
            maxlength="500"
            required
          />
        </div>
        <div class="form-group">
          <label class="label" for="postImg">Ajouter une images :</label>
          <input
            type="file"
            name="fileAttachment"
            class="form-control file-input"
            accept=".jpeg, .png, .jpg .gif"
            v-on:change="loadAttachment($event)"
          />
        </div>
        <div class="image-preview">
          <img
            src="../assets/no-preview.png"
            alt="'Image actuelle de la publication'"
            id="create-previewer"
            class="post-create-image-container"
          />
        </div>
        <input type="submit" value="Publier !" />
        <!-- <button>Publier !</button>  -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "postCreate",

  data() {
    return {
      postCreateInput: {
        content: "",
        file: "",
      },

      isWriting: false,
    };
  },

  methods: {
    loadAttachment(event) {
      this.postCreateInput.postImageUrl = event.target.files[0].name;
      this.postCreateInput.file = event.target.files[0];

      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("create-previewer").src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },

    submitPost() {
      const formData = new FormData();
      formData.append("content", this.postCreateInput.content);
      formData.append("fileAttachment", this.postCreateInput.file);
      formData.append("UserId", localStorage.getItem("userId"));

      this.axios
        .post("http://localhost:3000/api/post", formData)
        .then((res) => {
          console.log("Publication créé !", res);
          this.isWriting = false;
          const alertDatas = ({'type': "success", 'content': "Vous publication a été.... publié ! (j'ai pas trouvé mieux XD)' ", "header": "Publication accepté !"})
          this.$emit('alert', alertDatas )
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
@import "../../public/style.scss";
.form-create-post {
  display: flex;
  flex-direction: column;

  &__button-init {
    border: none;
    padding: 5px 7px;
    width: 80%;
    min-height: 50px;
    font-size: 22px;
    border-radius: 30px;
    @media screen and (max-width: map-get($breakpoints, "phone")) {
      width: 100%;
      border-radius: 0;
    }
  }

  & label {
    font-family: $primary-font;
    font-size: 18px;

    @media screen and (max-width: map-get($breakpoints, "phone")) {
      display: none;
    }
  }

  &__formular {
    & #post-create-input {
      border-radius: 30px;
    }
    & textarea {
      font-family: $primary-font;
      font-size: 20px;
      padding-left: 20px;
      min-height: 8rem;
      height: auto;
      width: 85%;
      border: $primary-color 3px solid;
      overflow: auto;
      outline: none;

      resize: none;

      border-radius: 30px;
      @media screen and (max-width: map-get($breakpoints, "phone")) {
        width: 100%;
        border-radius: 0;
        border-right: none;
        border-left: 0;
      }
    }

    & .image-preview {
      margin-bottom: 10px;
      & img {
        object-fit: contain;
        max-height: 500px;
        width: 70%;
        @media screen and (max-width: map-get($breakpoints, "phone")) {
          width: 100%;
          
        }
      }
    }

        @media screen and (max-width: map-get($breakpoints, "phone")) {
          width: 100%;
              & input, textarea {
      width: 100% !important;
      padding: 0;
      height: 60px;
    }
        }

    & .form-group{
      width: 100%;
      padding-bottom: 0;


    }
  }

  /* BOUTON "PUBLIER" */
  & input[type="submit"] {
    font-family: $secondary-font;
    font-size: 20px;
    font-weight: bold;
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

    @media screen and (max-width: map-get($breakpoints, "phone")) {
      background-color: $primary-color;
      color: $tertiary-color;
      width: 100%;
      border-radius: 0;
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
      @media screen and (max-width: map-get($breakpoints, "phone")) {
        width: 100% !important;
        border-radius: 0;
        height: 100%;
      }
    }
  }

  /* TEXTAREA Style */
  /* Centrage du placeholder du TEXTAREA recevant le contenus d'un nouveau post */
  & ::-webkit-input-placeholder {
    text-align: center;
  }

  /* Style de la scrollbar */
  & textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  & textarea::-webkit-scrollbar {
    position: absolute;
    right: 10px;
    width: 30px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 100px;
  }

  & textarea::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: $primary-color;
  }
}
</style>
