<template>
  <section class="about">
    <h1>This is an about page</h1>
    <PostFormular/>
  </section>
</template>

<script>
import PostFormular from '@/components/postCreate.vue'

export default {
name: 'Login',
components: {
    PostFormular
}
}
</script>
