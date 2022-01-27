<!-- COMPOSANT : Liste des utilisateurs -->
<template>
  <!-- CONTAINER user-list -->
  <div class="container-user-list">
    <!-- LOOP (boucle iterant sur le resultat de la methode GETALLUSERS du module (Array))-->
    <div v-for="(user, index) in allUsers" :key="index" class="user">
      <!-- CARD begin -->
      <router-link class="user-card card-link remove-decoration" :to="'/profil/' + user.id">
        <!-- CARD-header -->
        <div class="user-card__header">
          <!-- status Administrateur, ou non-Admin, de l'utilisateur affiché (condition)-->
          <div
            v-if="user.isAdmin == false"
            class="user-card__header__admin-status"
          >
            Utilisateur
          </div>
          <div
            v-if="user.isAdmin == true"
            class="user-card__header__admin-status"
          >
            Administrateur
          </div>
        </div>
        <!-- CARD-body -->
        <div class="user-card__body">
          <!-- informations de l'utilisateur (email, nom et prénom) -->
          <div class="user-card__body__user-infos">
            <div class="user-card__body__email">{{ user.email }}</div>
            <div class="user-card__body__names">
              {{ user.nickname || "Nom complet indisponible" }}
            </div>
          </div>
          <!-- bouton de suppression de l'utilisateur via la methode 'DELETEUSER()' (demande confirmation) -->
          <div class="user-card__body__actions">
            <button
              class="user-card__body__action-delete"
              v-if="this.isAdmin == 'true'"
              v-on:click="deleteUser(user.id)"
              onclick="return confirm('Etes-vous sûr(e) d'effacer cet utilisateur ?')"
            >Supprimer l'utilisateur</button>
          </div>
        </div>
        <!-- CARD-footer -->
        <div class="card-user__footer">
          <!-- Dates de creation du profil et de sa derniére modification -->
          <div class="card-user__footer__created-date">
            <p>
              Profil crée le : {{ new Date(user.createdAt).getDate() }} /
              {{ new Date(user.createdAt).getMonth() + 1 }} /
              {{ new Date(user.createdAt).getFullYear() }}
            </p>
          </div>
          <div class="card-user__footer__update-date">
            <p>
              Modifié le : {{ new Date(user.updatedAt).getDate() }} /
              {{ new Date(user.updatedAt).getMonth() + 1 }} /
              {{ new Date(user.updatedAt).getFullYear() }}
            </p>
          </div>
        </div>
      </router-link>
      <!-- CARD END -->
    </div>
  </div>
  <!-- CONTAINER user-list END -->
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
        isAdmin: localStorage.getItem('userIsAdmin'),

      allUsers: "",
    };
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    getAllUsers() {
      this.axios.get("http://localhost:3000/api/user").then((users) => {
        this.allUsers = users.data.users;
      }).catch(err=> console.log(err));
    },

    deleteUser(id) {
      this.axios.delete(`http://localhost:3000/api/user/${id}`).then(() => 
        history.go(0)
      ).catch(err=> console.log(err));
    },
  },
};
</script>

<style lang="scss">
.user{
    border: black 1px solid;
}
</style>
