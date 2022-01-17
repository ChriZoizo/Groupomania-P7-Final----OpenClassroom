<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
       <PostFormular/>
    <PostList/>
  </div>
</template>

<script>
import PostList from '@/components/postsList.vue'
import PostFormular from '@/components/postCreate.vue'

export default {
  name : "Home",
  components: {
    PostList,
    PostFormular
  }
}

</script>
