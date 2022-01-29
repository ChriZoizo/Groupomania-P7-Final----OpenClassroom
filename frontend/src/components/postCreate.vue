<template>
  <div class="form-create-post">
    <div v-if="isWriting == false">
      <button v-on:click="isWriting = !isWriting" class="form-create-post__button-create">Ecrire une publication</button>
    </div>
<div v-if="isWriting == true">
  <div class="form-create-post__header">
      <button v-on:click="isWriting = !isWriting" class="form-create-post__button-create">Fermer le formulaire</button>
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
        <label for="label postImg">Ajouter une image/GIF :</label>
        <input
          type="file"
          name="fileAttachment"
          class="form-control"
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
      formData.append("UserId", localStorage.getItem('userId'));

      this.axios
        .post("http://localhost:3000/api/post", formData)
        .then((res) => {
          console.log("Publication créé !", res)
          this.$router.go('/home/')
          })
          .catch(err=> console.log(err));
    },
  },
};
</script>

<style lang="scss">
@import "../../public/style.scss";
.form-create-post{
  display:flex;
  flex-direction: column;

&__button-create {
      border: none;
      padding: 5px 7px;
      width: 80%;
      height: 50px; /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
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

& label{
  font-family: $primary-font;
  font-size: 18px
}

&__formular {
 & textarea {
   font-family: $primary-font;
   font-size: 20px;
   padding-left: 20px;
   min-height: 4.5rem;
   height: auto;
   width: 85%;
    border: none;
    overflow: auto;
    outline: none;

    resize: none; 

    border-radius: 30px;
    
 }
}

}
/* Centrage du placeholder du TEXTAREA recevant le contenus d'un nouveau post */
::-webkit-input-placeholder {
   text-align: center;
}

::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;  
}

:-ms-input-placeholder {  
   text-align: center; 
}

/* Style de la scrollbar */
textarea::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
	border-radius: 10px;
	background-color: rgba(0,0,0,0);
}

textarea::-webkit-scrollbar
{ 
  position: absolute;
  right: 10px;
	width: 22px;
	background-color: rgba(0,0,0,0);
  border-radius: 0 30px 30px 0;
}

textarea::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: $primary-color;
}
</style>
