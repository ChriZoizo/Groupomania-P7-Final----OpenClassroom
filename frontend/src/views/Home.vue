<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
       <PostCreateFormular/>
    <PostList/>
  </div>
</template>

<script>
import PostList from '@/components/postsList.vue'
import PostCreateFormular from '@/components/postCreate.vue'

export default {
  name : "Home",
  components: {
    PostList,
    PostCreateFormular
  }
}

</script>
