<template>
<div class="form-create-post">
  <h2>Formulaire de publication</h2>
  <!--    enctype="multipart/form-data" -->
  <form @submit.prevent="onSubmit">
       <div class="form-group">
    <label for="Content">Contenus de la publication</label> :
    <textarea
      type="text"
      id="Content"
      name="Content" class="form-control"
      v-model="postCreateInput.content"
      placeholder="Ecrivez le contenus de votre publication ici ! ( 500 caractéres maximum )"
      maxlength="500"
    /></div>
           <div class="form-group">
    <label for="postImg">Ajouter une image/GIF</label> :
    <input
      type="file"
      name="postImageUrl" class="form-control" accept=".jpeg, .png, .jpg .gif"
      id="postImageUrl"
      v-on:change="loadAttachment"
    /></div>
         <input type="submit" value="Upload le fichier" />
<!--     <button>Publier !</button> -->
  </form>
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
        postImageUrl: "",
        userId: 1,
      },
    };
  },
  methods: {
    loadAttachment(event) {
      console.log(event.target.files[0].name)

       this.postCreateInput.postImageUrl= event.target.files[0].name; 
    },
onSubmit() {
      let inputsDatas = {
        content: this.postCreateInput.content,
        postImageUrl: this.postCreateInput.postImageUrl,
        userId: this.postCreateInput.userId,
      };
      inputsDatas.append('file', this.postImageUrl)
      console.log("blabla")
      this.axios
        .post("http://localhost:3000/api/post", inputsDatas)
        .then((res) => console.log("Publication créé !", res));
}
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
