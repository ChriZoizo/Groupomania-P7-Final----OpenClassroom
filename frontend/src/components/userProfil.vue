<!-- * - COMPOSANT : Profil d'utilisateur -->
<template>
  <div class="container-profil container flex-col">
    <!-- * CARD BEGIN (visible selon boleen 'updateMode'. Affiché par defaut au chargement -->
    <div v-show="!updateMode" class="profil rounded clear-text shadowed">
      <!-- ~ Card Header -->
      <div class="profil__header">
        <div class="profil__header__names">
          <!-- i SI l'utilisateur affiché est le meme que celui connecté, affiche un message personnalisé -->
          <h3 v-if="userInfos.id == currentUserId">
            Bienvenue
            <span class="informations">{{ userInfos.nickname }}</span>
          </h3>
          <!-- i SINON Nom complet de l'utilisateur affiché -->
          <p v-if="userInfos.id == currentUserId">Votre profil</p>
          <p v-else>Profil de {{ userInfos.nickname }}</p>
        </div>
      </div>
      <!-- ~ Card Body -->
      <div class="profil__body">
        <p class="profil__body__info">
          <!-- email utilisateur -->
          <i class="fas fa-at icon-fa"></i><span> Email : </span>
          <span class="informations"> {{ userInfos.email }}</span>
        </p>
        <!-- nom de l'utilisateur -->
        <p class="profil__body__info">
          <i class="far fa-id-card icon-fa"></i><span> Nom complet : </span>
          <span class="informations"> {{ userInfos.nickname }}</span>
        </p>
      </div>
      <!-- ~ Card Footer -->
      <div class="profil__footer">
        <!-- i SI l'utilisateur est un ADMIN, affiche un message -->
        <div class="profil__footer__left">
          <p v-if="userInfos.isAdmin == 'true'">Membre Administrateur !</p>
        </div>
        <!-- date de creation du profil -->
        <div class="profil__footer__right">
          <p>
            <span> Membre depuis : </span
            ><span class="informations"
              >{{ new Date(userInfos.createdAt).getDate() }} /
              {{ new Date(userInfos.createdAt).getMonth() + 1 }} /
              {{ new Date(userInfos.createdAt).getFullYear() }}
            </span>
          </p>
        </div>
      </div>
      <!-- END * CARD END -->

      <!-- i Bouton visible uniquement si le current user est Admin, OU le createur du profil affiché. @click = switch la data 'updateMode' (booleen)-->
      <button
        v-if="currentUserId == userInfos.id || currentUserIsAdmin == 'true'"
        v-on:click="updateMode = !updateMode"
        class="button button--secondary"
      >
        Modifier votre nom <i class="fas fa-pencil-alt"></i>
      </button>
    </div>

    <!-- * UPDATE User SECTION BEGIN (Caché par defaut, visible selon boleen 'updateMode) -->
    <div class="profil__update-section rounded shadowed" v-show="updateMode">
      <!-- * Form Update utilisateur -->
      <form
        @submit.prevent="updateProfil(userInfos.id)"
        class="profil__update-form"
      >
        <!-- ! information type tutorielle -->
        <p class="tuto clear-text">
          <i class="fas fa-info-circle"></i> Ici vous pouvez modifier votre nom
          que les autres utilisateurs peuvent voir
        </p>
        <div class="profil__update-form__form form-group">
          <!-- - Input TEXT -->
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
        <!-- Boutton Submit @sumbit= appelle la methode updateProfil +param userId-->
        <input
          type="submit"
          value="Enregistrer les modifications ?"
          onclick="return confirm('Etes-vous sûr des modifications apportés ?')"
        />
      </form>
      <!-- Bouton 'retour' fermant le formulaire (en passant la data 'updateMode' en false) -->
      <button
        class="button button--secondary button-return"
        v-on:click="updateMode = !updateMode"
      >
        Annuler
      </button>
    </div>
    <!--  END * UPDATE User SECTION END  -->
    <!-- - DELETE BUTTON Supprimant le profil. Visible sous conditions @click= Appel la methode 'deleteProfil' +param userId-->
    <button
      v-show="!updateMode"
      v-if="currentUserId == userInfos.id || currentUserIsAdmin == 'true'"
      v-on:click="deleteProfil(userInfos.id)"
      class="button button--danger shadowed"
    >
      Supprimer le compte ?
    </button>
  </div>
</template>

<script>
/* * -- SCRIPT -- */
export default {
  name: "UserProfil",

  /* - Props */
  props: ["profilId", "userInfos"],

  /* - Datas */
  data() {
    return {
      updateMode: false,

      /* Toutes ces datas proviennent du localStorage, qui ont ete enregistré au moment de la connexion (voir methods App.vue )  */
      /* currentUserId = NUMBER : 'userId' de l'utilisateur connecté */
      currentUserId: parseInt(localStorage.getItem("userId")),
      /* currentUserIsAdmin = BOOLEAN : Informe si l'utilisateur actuel est Admin (provient de la BDD)*/
      currentUserIsAdmin: localStorage.getItem("userIsAdmin"),
      /* currentUserToken = STRING : Token generé lors de la connexion par JWT (backend) */
      currentUserToken: localStorage.getItem("userToken"),

      /* user = OBJECT : contiens les données de l'utilisateur. Utilisé par les input text lors des modifications du profil */
      user: {},
    };
  },

  /* - LifeCycle */
  beforeUpdate() {
    this.setUserData();
  },

  /* - Methodes */
  methods: {
    /*. setUserData : Methode enregistre les données de la props 'userInfos' dans la data 'user'. Cette data sera utiliser
    pour pre remplir le formulaire de modification, ainsi que d'objet dans le body de la requete lors de l'enregistrement
    (voir la methode 'updateProfil') */
    setUserData() {
      this.user = this.userInfos;
    },

    /*. updateProfil : Methode qui enregistre en BDD les modification apporté au 'User'. Accepte un parametre 'id'. Ce parametre
    est ajouté a l'URI lors de l'appela a l'API (PUT). (Promise).
     Puis 'then' Envoie une commande pour afficher une alerte 'success' a l'utilisateur via la methode "Vue" $emit. La constante 'alertData' 
     contient les données pour l'alerte tel que le type, contenus et 'titre'. Enfin, passe la data 'updateMode' a false
     Sinon 'catche' affiche en console l'erreur communiqué par l'API.
    @param
      << id = Number
    $emit 
      ^^ alertData = Object { "type": STRING, 'content', STRING, 'header' STRING}
    @return
      >> NO RETURN*/
    updateProfil(id) {
      this.axios
        .put(`http://localhost:3000/api/user/${id}`, this.user)
        .then(() => {
          /* declaration de la constante contenant les données de l'alerte */
          const alertData = ({
            "type": "success",
            "content": "Votre profil a été mis a jour !",
            "header": "Profil"
          });
          /* Emission de l'evenement (nommé 'alert') accompagné par la constante ci-dessus */
          this.$emit("alert", alertData );
          /* Repasse le composant en mode vue normal */
          this.updateMode = false
        })
        .catch((err) => console.log(err));
    },

    /*. deleteProfil : Methode qui supprimer l'utilisateur de la BDD. Accepte un parametre 'id'. 
    Demande au prealable une confirmation via la methode "confirm()".
    Confirmation OK >  verifie si l'utilisateur connecté posséde l'id de l'utilisateur a supprimé (parametre 'id') >> Si 'true', vide le "localStorage".
      le parametre 'id' est ajouté a la fin de l'URI lors de l'appel a l'API (DELETE).  (Promise)
      Puis 'then' redirige l'utilisateur sur la page 'Home', appel l'API en passant le parametre
      Sinon 'catch' affiche en console l'erreur communiqué par l'API
          @param
      << id = Number
    @return
      >> NO RETURN */
    deleteProfil(id) {
      if (confirm("Etes-vous sûr ?! \nToutes suppression est definitive !")) {
        /* Check si les IDs concordent */
        if (this.currentUserId == id) {
          /* Si oui : Efface le localStorage */
          localStorage.clear();
            /* Redirection */ this.$router.go("/home");
        }
        /* Appel API */
        this.axios
          .delete(`http://localhost:3000/api/user/${id}`)
          .then(() => {
            /* Redirection */ this.$router.go("/home");
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* * -- STYLE -- */
/* Importation du fichier contenant les mixins, variables et autres joyeusetés du genre */
@import "../../public/style.scss";

.container {
  align-items: center;
}

.profil {
  max-width: 1000px;
  width: 80%;
  background-color: $primary-color;
  margin: 20px 0;
  padding: 20px;
  position: relative;
  text-align: center;
  @media screen and (max-width: map-get($breakpoints, "phone")) {
    width: 100% !important;
    padding: 5px 0 0 0;
    margin: 3px 0;
    border-radius: 0;
    box-shadow: none;
  }

  /* Section Profil affichant les informations */
  &__body {
    display: flex;
    justify-content: space-around;
    @media screen and (max-width: map-get($breakpoints, "tablet")) {
      flex-direction: column;
      align-items: center;
    }

    .informations {
      font-weight: bolder;
    }

    & span {
      margin: 0 5px;
    }
  }

  /* Section Update Profil */
  &__update-section {
      text-align: center;
    background-color: $primary-color;
    margin: 20px 0;
    padding: 20px;
    width: 100%;
    border-radius: 30px;
    position: relative;
    @media screen and (max-width: map-get($breakpoints, "phone")) {
      border-radius: 0;
      margin: 3px 0 0 0;
      padding-bottom: 3px;
    }
  }

     /* formulaire d'update */
  &__update-form {
    width: 100%;
    margin-top: 10px;
    &__form {
      margin-top: 25px;
      display: flex;
      flex-direction: row;
      font-family: $primary-font;
    }

/* Input Submit du formulaire d'update */
    & input[type="submit"] {
      font-family: $secondary-font;
      font-size: 22px;
      font-weight: bold;
      padding: 5px 15px;
      border: $primary-color 3px solid;
      width: 50%;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        transition: 500ms;
        background-color: $primary-color;
        color: $tertiary-color;
      }

      @media screen and (max-width: map-get($breakpoints, "tablet")) {
        font-size: 18px;
        padding: 5px 8px;
      }
    }

/* Style des <label> + <input> Avec Breakpoints */
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
          width: 50%;
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
      & .label {
        text-align: right;
      }

      & input[type="submit"] {
        border-radius: 0;
        width: 100%;
        border-right: none !important;
        border-left: none !important;
        margin-top: -19px;
      }
      & input[type="text"] {
        border-right: none !important;
        border-left: none !important;
        width: 100% !important;
      }
    }
  }
}

/* Style de bouton Specifique au composant  */
.button {
  /* Parametre de base */
  border: none;
  padding: 5px 7px;
  width: 60%;
  border-radius: 5px;
  margin: 15px auto;
  height: 50px;

/* Variation pour le bouton 'modifier votre nom' et du bouton 'retour'' */
  &--secondary {
    height: 50px;
    font-size: 15px;
  }
/* Specificités du bouton 'supprimer un utilisateur' */
  &--danger {
    border-radius: 30px !important;
    font-size: 18px;
    /* Ici la largeur est calculé ainsi pour concorder avec les margin du conteneur */
    width: calc(60% + 40px) !important;
    @media screen and (max-width: map-get($breakpoints, "phone-small")) {
      background: $secondary-color;
      color: $danger-color-lighter;
      width: 100% !important;
    }
  }

/* Specificités du bouton 'retour', notamment la position + breakpoints */
  &-return {
    position: absolute;
    right: 0;
    top: -15px;
    border: none;
    font-size: 19px;
    width: 120px;
    height: 40px;
    border-radius: 0 30px 0 0;
    font-size: 15px;
  }
  @media screen and (max-width: map-get($breakpoints, "tablet")) {
    position: unset;
    border-radius: 5px;
    width: 50%;
    margin-top: 15px;
  }
  @media screen and (max-width: map-get($breakpoints, "phone-small")) {
    width: 100%;
    border-radius: 0 !important;
    margin: 0;
  }
}
</style>
