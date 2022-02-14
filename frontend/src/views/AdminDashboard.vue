<!-- *** - Dashboard Administrateur. Affiche la liste des utilisateur-->
<template>
    <div class="admin-dashboard">
        <section class="admin-dashboard__user-section">
            <!-- Composant :Liste des utilisateurs -->
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
}
</script>

<style lang="scss">

</style>
