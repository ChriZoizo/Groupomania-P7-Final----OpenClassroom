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

}

</style>
