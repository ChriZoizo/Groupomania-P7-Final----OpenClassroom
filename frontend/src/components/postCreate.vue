<template>
  <div class="form-create-post">
    <div v-if="isWriting == false">
      <button
        v-on:click="isWriting = !isWriting"
        class="form-create-post__button-init button-shadow"
      >
        Ecrire une publication
      </button>
    </div>
    <div v-if="isWriting == true">
      <div class="form-create-post__header">
        <button
          v-on:click="isWriting = !isWriting"
          class="form-create-post__button-init button-shadow"
        >
          Fermer le formulaire
        </button>
        <h2>Formulaire de publication</h2>
      </div>
      <!--    enctype="multipart/form-data" -->
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
      console.log(event.target.files[0]);
      this.postCreateInput.postImageUrl = event.target.files[0].name;
      this.postCreateInput.file = event.target.files[0];
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
          this.$router.go("/home/");
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
    height: 50px;
    font-size: 22px;
    color: $grey-light-color;
      background-color: $primary-color;
    &:hover {
      background-color: $secondary-color;
      color: $grey-light-color;
      transition-duration: 500ms;
      width: 85%;
      transform: scale(0.96);
    }
  }

  & label {
    font-family: $primary-font;
    font-size: 18px;
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
      border: $primary-color 1px solid;
      overflow: auto;
      outline: none;

      resize: none;

      border-radius: 30px;
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

/* TEXTAREA Style */
/* Centrage du placeholder du TEXTAREA recevant le contenus d'un nouveau post */
& ::-webkit-input-placeholder {
  text-align: center;
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
