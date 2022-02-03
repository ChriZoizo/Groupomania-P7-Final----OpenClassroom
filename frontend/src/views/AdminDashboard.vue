<template>
    <div class="admin-dashboard">
        <section class="admin-dashboard__user-section">
        <UserList/>
        </section>
    </div>
</template>
<script>
import UserList from '@/components/usersList.vue'

export default{
    name: "AdminDashboard",
    components: {
        UserList, 
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
