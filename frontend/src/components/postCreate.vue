<template>
  <div class="container-formCreatePost">
    <div v-if="isWriting == false">
      <button v-on:click="isWriting = !isWriting">Ecrire une publication</button>
    </div>
<div v-if="isWriting == true">
  <div class="formCreatePost__header">
    <h2>Formulaire de publication</h2>
      <button v-on:click="isWriting = !isWriting">Fermer le formulaire</button>
  </div>
    <!--    enctype="multipart/form-data" -->
    <form @submit.prevent="onSubmit" class="formCreatePost">
      <div class="form-group">
        <label for="Content">Contenus de la publication</label> :
        <textarea
          type="text"
          id="Content"
          name="Content"
          class="form-control"
          v-model="postCreateInput.content"
          placeholder="Ecrivez le contenus de votre publication ici ! ( 500 caractéres maximum )"
          maxlength="500"
        />
      </div>
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
      <input type="submit" value="Upload le fichier" />
      <!--     <button>Publier !</button> -->
    </form>

    <form>
      <input v-on:change="test" type="text" value="test" />
    </form>
    </div>
  </div>
  <!-- MULTIPLE FILES -->

  <!--   PHOTO-->
</template>

<script>
export default {
  name: "postCreate",

  data() {
    return {
      postCreateInput: {
        content: "",
        /*         postImageUrl: "", */
        UserId: 1,
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

    test() {
      console.log(this.postCreateInput);
    },
    onSubmit() {
      /*       let inputsDatas = {
        content: this.postCreateInput.content,
        postImageUrl: this.postCreateInput.postImageUrl,
        userId: this.postCreateInput.userId,
        file: this.postCreateInput.file
      }; */
      const formData = new FormData();
      formData.append("content", this.postCreateInput.content);
      formData.append("fileAttachment", this.postCreateInput.file);
      formData.append("UserId", this.postCreateInput.UserId);

      console.log("blabla");
      this.axios
        .post("http://localhost:3000/api/post", formData)
        .then((res) => console.log("Publication créé !", res));
    },
    /*     createPost() {
      let inputsDatas = {
        content: this.postCreateInput.content,
        imageUrl: this.postCreateInput.imageUrl,
        userId: this.postCreateInput.userId,
      };
      console.log("blabla")
      this.axios
        .post("http://localhost:3000/api/post", inputsDatas)
        .then((res) => console.log("Publication créé !", res));
    }, */
  },
};
</script>
