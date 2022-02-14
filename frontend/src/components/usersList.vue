<!-- COMPOSANT : Liste des utilisateurs -->
<template>
  <!-- CONTAINER user-list -->
  <div class="container-user-list container">
    <div class="user-list">
      <!-- LOOP (boucle iterant sur le resultat de la methode GETALLUSERS du module (Array))-->
      <div v-for="(user, index) in allUsers" :key="index" class="user rounded text-center">
        <!-- CARD begin -->
        <router-link
          class="user-card card-link remove-decoration"
          :to="'/profil/' + user.id"
        >
          <!-- CARD-header -->
          <div class="user-card__header">
            <!-- status Administrateur, ou non-Admin, de l'utilisateur affiché (condition)-->
            <div
              v-if="user.isAdmin != true"
              class="user-card__header__admin-status"
            >
              <span> <i class="fas fa-user user-logo user--simple"></i> </span>
              <p>Utilisateur</p>
            </div>
            <div
              v-if="user.isAdmin == true"
              class="user-card__header__admin-status"
            >
              <span>
                <i class="fas fa-user-shield user-logo user--admin"></i>
              </span>
              <p>Administrateur</p>
            </div>
          </div>
          <!-- CARD-body -->
          <div class="user-card__body">
            <!-- informations de l'utilisateur (email, nom et prénom) -->
            <div class="user-card__body__user-infos">
              <div class="user-card__body__email">
                <p>{{ user.email }}</p>
              </div>
              <div class="user-card__body__names">
                <p>{{ user.nickname || "Nom complet indisponible" }}</p>
              </div>
            </div>
            <!-- bouton de suppression de l'utilisateur via la methode 'DELETEUSER()' (demande confirmation) -->
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
            <div class="user-card__body__actions">
              <button
                class="user-card__body__action-delete button--danger"
                v-if="this.isAdmin == 'true'"
                v-on:click="deleteUser(user.id)"
              >
                Supprimer l'utilisateur
              </button>
            </div>
          </div>
        </router-link>
        <!-- CARD END -->
      </div>
    </div>
  </div>
  <!-- CONTAINER user-list END -->
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      isAdmin: localStorage.getItem("userIsAdmin"),

      allUsers: "",
    };
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    getAllUsers() {
      this.axios
        .get("http://localhost:3000/api/user")
        .then((users) => {
          this.allUsers = users.data.users;
        })
        .catch((err) => console.log(err));
    },

    deleteUser(id) {
      console.log(id)
      if (
        confirm(
          "Etes-vous sûr(e) d'effacer cet utilisateur ? \nToute suppression est definitive !"
        )
      ) {
        this.axios
          .delete(`http://localhost:3000/api/user/:${id}`)
          .then(() => history.go(0))
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/style.scss";
.container {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  @media screen and (max-width: map-get($breakpoints, "phone-small")) {
    padding-top: 7px;
    padding-bottom: 7px;
  }
}

.user {
  position: relative;
  font-family: $primary-font;
  width: 40%;
  min-width: 390px;
  margin: 20px 10px;
  background-color: $primary-color;
  @media screen and (max-width: map-get($breakpoints, "tablet")) {
    width: 80%;
    margin: 20px auto;
  }
  @media screen and (max-width: map-get($breakpoints, "phone")) {
    width: 90%;
    margin: 7px auto;
  }
  @media screen and (max-width: map-get($breakpoints, "phone-small")) {
    width: 100%;
    margin: 2px 0;
    border-radius: 0;
      min-width: unset;
  }

  & .card-user{
    &__footer{

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
& p {
  font-size: 13px;
  margin: 1em 0.6em;
}
    }
  }

  &-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    @media screen and (max-width: map-get($breakpoints, "tablet")) {
      flex-direction: column;
    }
  }

  & p {
    color: white;
  }

  & span {
    color: white;
    display: inline;
  }

  &-logo {
    position: absolute;
    left: 17px;
    top: 14px;
  }

  &--admin {
    color: $tertiary-color;
  }
  &--simple {
    color: $grey-light-color;
  }

  & .button--danger {
    background-color: $secondary-color !important;
    width: 100%;
    border-radius: 0 0 30px 30px;
    height: 35px;
    border: none;
    @media screen and (max-width: map-get($breakpoints, "phone-small")) {
      border-radius: 0;
    }
  }
}
</style>
