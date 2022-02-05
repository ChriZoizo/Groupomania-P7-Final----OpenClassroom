<!-- * - COMPOSANT : Profil d'utilisateur -->
<template>
  <div class="container-profil container">
    <!-- CARD BEGIN (S'affiche si la Data 'updateMode' est sur false-->
    <div v-show="!updateMode" class="profil">
      <!-- CARD Header -->
      <div class="profil__header">
        <div class="profil__header__names">
          <!-- SI l'utilisateur affiché est le meme que celui connecté, affiche un message personnalisé -->
          <h3 v-if="user.userId == currentUserId">
            Bienvenue
            <span class="informations">{{ user.nickname }}</span>
          </h3>
          <!-- SINON Nom complet OU email de l'utilisateur affiché -->
          <p v-if="user.userId == currentUserId">Votre profil</p>
          <p v-else>Profil de {{ user.nickname || user.email }}</p>
        </div>
      </div>
      <!-- CARD Body -->
      <div class="profil__body">
        <p class="profil__body__info">
          <!-- INFOS Utilisateur affiché -->
          <!-- email -->
          <i class="fas fa-at icon-fa"></i> Email :
          <span class="informations">{{ user.email }}</span>
        </p>
        <!-- Nom complet OU "Nom Inconnu" -->
        <p class="profil__body__info">
          <i class="far fa-id-card icon-fa"></i> Nom complet :
          <span class="informations">{{
            user.nickname || "Nom inconnu "
          }}</span>
        </p>
      </div>
      <!-- CARD Footer -->
      <div class="profil__footer">
        <!-- SI l'utilisateur est un ADMIN, affiche un message dans la partie gauche du footer de Card -->
        <div class="profil__footer__left">
          <p v-if="user.isAdmin == 'true'">Membre Administrateur !</p>
        </div>
        <!-- Affiche la date de creation du profil dans la partie droite du footer de Card -->
        <div class="profil__footer__right">
          <p class="informations">
            Membre depuis : {{ new Date(user.createdAt).getDate() }} /
            {{ new Date(user.createdAt).getMonth() + 1 }} /
            {{ new Date(user.createdAt).getFullYear() }}
          </p>
        </div>
      </div>
      <!-- CARD END -->
      <!-- UPDATE User SECTION -->
      <!-- BOUTTON S'affiche uniquement si l'utilisateur connecté est ADMIN OU identique a celui affiché (comparaison via userID) -->
      <div
        class="profil__action-buttons"
        v-if="currentUserId == user.userId || currentUserIsAdmin == 'true'"
      ><!-- Passe la Data 'updateMode' en "true" -->
        <button
          v-on:click="updateMode = !updateMode"
          class="button button--main shadowed"
        >
          Modifier votre nom <i class="fas fa-pencil-alt"></i>
        </button>
      </div>
    </div>
    <div  v-show="updateMode">
    <div class="profil__update-section">
    <!-- FORM UPDATE User -->
    <!-- (S'affiche si la Data 'updateMode' est "true") -->
    <form
      @submit.prevent="updateProfil(user.userId)"

      class="profil__update-form"
    >
    <!-- Informations -->
      <p class="tuto clear-text">
        <i class="fas fa-info-circle"></i> Ici vous pouvez modifier votre nom
        que les autres utilisateurs peuvent voir
      </p>
      <div class="profil__update-form__form form-group">
        <!-- Input text -->
        <label for="new-names" class="label clear-text"
          ><i class="far fa-id-card icon-fa"> </i>- Nom complet :
        </label>
        <input
          type="text"
          id="new-names"
          class="form-control"
          v-model="user.nickname"
          maxlength="40"
        />
      </div>
      <!-- boutton submit -->
      <input
        type="submit"
        value="Enregistrer les modifications ?"
        onclick="return confirm('Etes-vous sûr des modifications apportés ?')"
      />
    </form>

    </div>
                    <button
          class="button--secondary"
          v-on:click="updateMode = !updateMode"
        >
          Annuler
        </button>
    </div>
    <!-- DELETE BUTTON -->
    <button
      v-show="!updateMode"
      v-if="currentUserId == user.userId || currentUserIsAdmin == 'true'"
      v-on:click="deleteProfil(user.userId)"
      class="button button--danger shadowed"
    >
      Supprimer le compte ?
    </button>
  </div>
</template>

<script>
export default {
  name: "UserProfil",

  data() {
    return {
      updateMode: false,

      currentUserId: parseInt(localStorage.getItem("userId")),
      currentUserIsAdmin: localStorage.getItem("userIsAdmin"),
      currentUserToken: localStorage.getItem("userToken"),

      userIdToDisplay: 0,

      user: {
        userId: 0,
        email: "",
        nickname: "",
        isAdmin: false,
        createdAt: "",
      },
    };
  },

  created() {
    this.getIdInUrl(), this.getUserInfos(this.userIdToDisplay);
  },

  methods: {
    getIdInUrl() {
      const url = this.$route.path.split("/");
      const id = parseInt(url[2]);
      this.userIdToDisplay = id;
      return id;
    },

    setUserInData(data) {
      this.user.email = data.email;
      this.user.nickname = data.firstName;
    },

    getUserInfos(id) {
      this.axios
        .get(`http://localhost:3000/api/user/${id}`)
        .then((user) => {
          let userInfo = user.data.user;
          (this.user.userId = userInfo.id),
            (this.user.email = userInfo.email),
            (this.user.nickname = userInfo.nickname),
            (this.user.createdAt = userInfo.createdAt),
            (this.user.isAdmin = userInfo.isAdmin);
          console.log(this.user);
        })
        .catch((err) => console.log(err));
    },

    updateProfil(id) {
      this.axios
        .put(`http://localhost:3000/api/user/${id}`, this.user)
        .then((profil) => {
          console.log(profil);
          history.go(0);
        })
        .catch((err) => console.log(err));
    },

    deleteProfil(id) {
           if (confirm('Etes-vous sûr ?! \nToutes suppression est definitive !')) {
      this.axios
        .delete(`http://localhost:3000/api/user/${id}`)
        .then(() => {
          this.$router.go("/home");
        })
        .catch((err) => console.log(err));
    }},
    
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/style.scss";

.informations {
  font-weight: bolder;

  &--aside {
    font-size: 12px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profil {
  max-width: 1000px;
  width: 60%;

  &__body {
    display: flex;
    justify-content: space-around;

    &__info {
      display: flex;
      align-items: center;
      & .icon-fa {
        color: $primary-color;
        font-size: 25px;
      }
    }
  }

  &__update-section{
    background-color: $primary-color;
    margin: 20px 0;
    padding: 20px;
    width: 800px;
    border-radius: 30px;
  }

  &__update-form {
    width: 100%;
    margin-top: 10px;
    &__form {
      margin-top: 25px;
      display: flex;
      flex-direction: row;
      font-family: $primary-font;
    }



    @media screen and (max-width: map-get($breakpoints, "desktop")) {
      & label {
        font-size: 20px;
      }

      & input[type="textarea"] {
        width: 45%;
      }
    }

    @media screen and (max-width: map-get($breakpoints, "notebook")) {
      & label {
        font-size: 16px;
        width: 30%;
      }
    }

    @media screen and (max-width: map-get($breakpoints, "tablet")) {
      &__form {
        flex-direction: column;
        & label {
          font-size: 20px;
          width: unset;
          margin: 15px auto;
        }

        & input[type="text"] {
          text-align: center !important;
        }
      }
    }

    @media screen and (max-width: map-get($breakpoints, "phone")) {
      & input[type="submit"] {
        font-size: 16px !important;
        font-weight: initial !important;
        padding: 5px;
      }
      & input[type="text"] {
        font-size: 17px !important;
      }
    }

    @media screen and (max-width: map-get($breakpoints, "phone-small")) {
      
      & input[type="submit"] {
        width: 100%;
        border-right: none !important;
        border-left: none !important;
        margin-top: -19px;
      }
      & input[type="text"] {
                border-right: none !important;
        border-left: none !important;
        width: 100%;
      }
    }

    & input[type="submit"] {
      font-family: $secondary-font;
      font-size: 22px;
      font-weight: bold;
      padding: 5px 15px;
      border: $primary-color 3px solid;
      cursor: pointer;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      &:hover {
        transition: 500ms;
        background-color: $primary-color;
        color: $tertiary-color;
      }
    }
  }
}

       .button--secondary {

      border:none;
      font-size: 19px;
      width: 120px;
      height: 40px

    }

.button {
  border: none;
  padding: 5px 7px;
  width: 50%;
  border-radius: 30px;
  margin: 15px auto;
  min-width: 300px;
  max-width: 900px;
  height: 50px;

  &--main {
    height: 50px;
    font-size: 22px;
  }

  &--danger {
    font-size: 18px;
width: unset;
    &:hover {
      font-weight: bolder;

    }
  }
}
</style>
