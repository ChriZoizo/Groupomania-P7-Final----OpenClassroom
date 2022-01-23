<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard__user-section">
        <UserList/>
        </div>
        <div class="admin-dashboard__post-section">
        <PostList/>
        </div>
    </div>
</template>
<script>
import PostList from '@/components/postsList.vue'
import UserList from '@/components/usersList.vue'

export default{
    name: "AdminDashboard",
    components: {
        UserList, 
        PostList,
    },

    data() {
        
    },
}
</script>

<style lang="scss">
.admin-dashboard {
    display: flex;
    flex-direction: row;
    justify-content: space-around; /* ??? */

    &__user-section {
        width: 35%;
    }
    &__post-section {
        width: 50%;
    }
}

</style>
