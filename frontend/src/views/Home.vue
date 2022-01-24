<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <section>
       <PostCreateFormular/>
    <PostList/>
    </section>
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
