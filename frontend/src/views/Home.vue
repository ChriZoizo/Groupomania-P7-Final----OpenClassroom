<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg=">@@@@@@@@@@@@@@</"/>
    <PostList/>
  </div>
</template>

<script>
import PostList from '@/components/postsList.vue'

export default {
  name : "Home",
  components: {
    PostList
  }
}

</script>
