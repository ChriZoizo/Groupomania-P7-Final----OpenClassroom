<template>
<section id="user-profil">
    <UserProfil />
          <PostList />
</section>

</template>

<script>
import UserProfil from '@/components/userProfil.vue'
import PostList from '@/components/postsList.vue'

export default {
    name: 'Profil',
    components: {
        UserProfil, PostList
    },

    data() {
        
    },
}
</script>

<style lang="scss">

</style>