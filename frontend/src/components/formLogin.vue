<!-- * - COMPOSANT : Login / Logout Formulaire -->
<template>
  <!-- * SECTION - Formular Log/Sign Container BEGIN -->
  <section class="formularLog container">
    <div class="formularLog-container">
      <!-- Bouton Select Formulaire -->
      <div class="formularLog__header-buttons">
        <!-- Bouton Pour afficher le formulaire de CONNEXION - utilise la methode 'displayLogin" Visible uniquement si 'displayLoginForm' est True  -->
        <button
          class="main"
          v-on:click="displayLogin"
          v-bind:class="{ active: displayLoginForm }"
        >
          Connectez vous !
        </button>
        <!-- Bouton Pour afficher le formulaire d'INSCRIPTION - utilise la methode 'displaySignup" Visible uniquement si 'displaySignupForm' est True  -->
        <button
          v-on:click="displaySignup"
          v-bind:class="{ active: displaySignupForm }"
        >
          Inscrivez vous !
        </button>
      </div>
      <!-- * LOGIN FORM BEGIN - Visible Uniquement si 'displayLoginForm' est True -->
      <div v-show="displayLoginForm" class="form-login">
        <!-- Instructions -->
        <div class="form-login__header">
          <h4>
            Connectez vous en renseignant votre e-mail et votre mot de passe
          </h4>
        </div>
        <!-- - Debut du Formulaire LOGIN -->
        <form v-on:submit.prevent="login" id="form-login" method="post">
          <!-- Input Email - lié a la Data 'inputForm.email' -->
          <div class="form-group">
            <label for="email">E-mail :</label>
            <input
              type="email"
              id="email__login"
              name="emailLogin"
              class="form-control__login email"
              placeholder="exemple@gogole.com"
              v-model="inputForm.email"
              required
            />
          </div>
          <!-- Input Mot de Passe - lié a la Data 'inputForm.password-->
          <div class="form-group">
            <label for="password"> Mot de passe :</label>
            <input
              type="password"
              id="password__login"
              name="passwordLogin password"
              class="form-control__login"
              placeholder="exemple: pasazertysvp"
              v-model="inputForm.password"
              required
            />
          </div>
          <!-- Bouton 'Connexion !' declenche la methode 'login' -->
          <button class="log-button">
            <i class="fas fa-sign-in-alt"></i> Connexion !
          </button>
        </form>
      </div>
      <!-- END LOGIN FORM END -->
      <!-- * SIGNUP FORM BEGIN - Visible Uniquement si 'displaySignupForm' est True -->
      <div v-show="displaySignupForm" class="form-signup">
        <!-- Instructions -->
        <div class="form-signup__header">
          <h4>
            Pour vous inscrire, vous devez avoir un e-mail valide, un mot de
            passe et un nom, c'est tout ! :)
          </h4>
        </div>
        <!-- - Debut du Formulaire SIGNUP -->
        <form v-on:submit.prevent="signup" id="form-signup" method="post">
          <!-- Input Email - lié a la Data 'inputForm.email' -->
          <div class="form-group">
            <label for="email">E-mail :</label>
            <input
              type="email"
              id="email__signup"
              name="emailSignup"
              class="form-control__signup email"
              placeholder="exemple@gogole.com"
              v-model="inputForm.email"
              required
            />
          </div>
          <!-- Input Mot de Passe - lié a la Data 'inputForm.password-->
          <div class="form-group">
            <label for="password"> Mot de passe :</label>
            <input
              type="password"
              id="password__signup"
              name="passwordSignup"
              class="form-control__signup password"
              placeholder="Ex: pasazertysvp  ( 7 Charactéres MINIMUM )"
              v-model="inputForm.password"
              required
            />
          </div>
                    <!-- Input Nickname (Nom complet) - lié a la Data 'inputForm.nickname-->
          <div class="form-group">
            <label for="nickname"> Nom complet :</label>
            <input
              type="nickname"
              id="nickname__signup"
              name="nicknameSignup"
              class="form-control__signup nickname"
              placeholder="Ex: Jean Desmoulin"
              v-model="inputForm.nickname"
              required
            />
          </div>
                    <!-- Bouton 'Inscription !' declenche la methode 'signup' -->
          <button class="log-button">
            <i class="fas fa-sign-in-alt"></i> Inscription !
          </button>
        </form>
              <!-- END SIGNUP FORM END -->
      </div>
    </div>
    <div v-on:click="test">edfdfdf</div>
  </section>
  <!-- * END SECTION formularLog END -->
</template>

<script>
/* -- SCRIPT -- */
export default {
  name: "Login",

/* - Data */
  data() {
    return {
      /* displayLoginForm = Boolean : Utilisé pour affiché le formulaire Login */
      displayLoginForm: true,
      /* displaySignupForm = Boolean :  Utilisé pour affiché le formulaire Signup */
      displaySignupForm: false,

      /* InputForm = Object : Est utilisé par les formulaires et les methodes 'signup' et 'login'. Contient les données que l'utilisateur communique.
            >> email = String : Email de l'utilisateur
            >> password = String : Mots de passe de l'utilisateur
            >> nickname = String : Nom complet de l'utilisateur */
      inputForm: {
        email: "",
        password: "",
        nickname: "",
      },
    };
  },

  /* - Methodes */
  methods: {

    /*. dispayLogin : Methode qui passe la data 'displayLoginForm' en true, et 'displaySignupForm' a false. Ce qui as pour effet d'afficher le formulaire login et 
    faire disparaite le formulaire Signup */
    displayLogin() {
      this.displayLoginForm = true;
      this.displaySignupForm = false;
    },
        /*. dispaySignup = Methode qui passe la data 'displaySignupForm' en true, et 'displayLoginForm' a false. Ce qui as pour effet d'afficher le formulaire Signup et 
    faire disparaite le formulaire login  */
    displaySignup() {
      this.displayLoginForm = false;
      this.displaySignupForm = true;
    },

    /*. signup : methode qui créer un nouvel utilisateur en BDD vie une requete a l'API (POST) en passant dans le body de la requete l'Objet inputForm (AXIOS Promise).
    - 'inputForm' contient les données que l'utilisateur a entré dans les formulaires. (Voir Datas). La requête est envoyé.
    - Si 'Then', l'enregistrement est un succées, utilise alors la methode 'displayLogin' pour basculer sur le formulaire de connexion
    - sinon 'Catch' affiche en console une erreur*/
    signup() {
      this.axios
        .post("http://localhost:3000/api/user/signup", this.inputForm)
        .then(() => {this.displayLogin();
        this.checkInputDatas(this.inputForm)})
        .catch((err) =>{
          console.log(err)

        });
    },

    checkInputDatas(datas) {
/*     let email = datas.email; */
console.log(datas)
    let password = datas.password;
    let nickname = datas.nickname || false;
    let regExChecker = new RegExp("/[&<>\\`\"{}]/");
    let checkResult =  regExChecker.test(password)

    if (password.length < 7 || checkResult === true ) {
console.log('Probleme with password')
          /* declaration de la constante contenant les données de l'alerte */
          const alertData = ({
            "type": "error",
            "content": "Mot de passe incorrect !",
            "header": "Connexion Echoué !"
          });
                    /* Emission de l'evenement (nommé 'alert') accompagné par la constante ci-dessus */
          this.$emit("alert", alertData );
    }
    if (nickname.length > 0){
      if (nickname.length > 40 || regExChecker.test(nickname)) {
          /* declaration de la constante contenant les données de l'alerte */
          const alertData = ({
            "type": "error",
            "content": "Nom complet trop long",
            "header": "Connexion Echoué !"
          });
          /* Emission de l'evenement (nommé 'alert') accompagné par la constante ci-dessus */
          this.$emit("alert", alertData );
      }
    }
/*     if (email.length >) */
    },

    /* LOGIN */
    login() {
      let inputDatas = {
        email: this.inputForm.email,
        password: this.inputForm.password,
      };

      this.checkInputDatas(inputDatas)



      this.axios
        .post("http://localhost:3000/api/user/login", inputDatas)
        .then((res) => {
          this.$emit("signed", res.data);
        })
        .catch((err) => {
          console.log(err)
});
    },
  },
};
</script>

<style lang="scss">
@import "../../public/style.scss";
/* button {
  width: 120px;
  height: 40px;
  border-radius: 30px;
  padding: 10px;
  margin: 15px 0px 25px 0px;
  background-color: white;
  color: #0c2444;
  &:hover {
    transform: scale(1.15);
    opacity: 0.85;
    -webkit-transition: 0.3s ease-in;
    transition: 0.3s ease-out;
  }
} */
form {
  margin-top: 25px;
}
label {
  display: block;
  width: 25%;
  text-align: right;
  font-size: 22px;
  margin: auto;

  @media screen and (max-width: map-get($breakpoints, "notebook")) {
    font-size: 19px !important;
  }
  @media screen and (max-width: map-get($breakpoints, "tablet")) {
    font-size: 16px !important;
  }
}
input,
textarea {
  width: 50%;
  height: 3em;
  box-sizing: border-box;
  outline: none;
  padding: 10px;
  margin: auto;
  font-family: $primary-font;
  font-size: 19px;
  @media screen and (max-width: map-get($breakpoints, "phone")) {
    font-size: 16px !important;
    width: 65%;
    margin-left: 0;
  }
  @media screen and (max-width: map-get($breakpoints, "phone-small")) {
    width: 100%;
    margin-right: 0;
  }

  &:focus {
    border-color: white;
    box-shadow: 0px 0px 20px #0c2444;
  }
}
.form-group {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 15px;
  margin: auto;
  @media screen and (max-width: map-get($breakpoints, "phone-small")) {
    flex-direction: column;
  }
}

/* .border-box {
} */

.formularLog {
  margin: auto;
  width: 60%;
  padding-top: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  align-items: center;
  @media screen and (max-width: map-get($breakpoints, "phone")) {
    width: 100%;
  }
  & p,
  h2 {
    padding: 0 15px 0 15px;
  }

  &__header-buttons {
    display: flex;
    justify-content: center;
    @media screen and (max-width: map-get($breakpoints, "phone")) {
      width: 100%;
      flex-direction: column;
    }
  }

  button {
    border: none;
    border-radius: 30px;
    padding: 5px 25px;
    margin: 5px 15px;
    height: 50px;
    font-size: 18px;
    color: $grey-light-color;
    background-color: $primary-color;
    @media screen and (max-width: map-get($breakpoints, "phone")) {
      width: 100%;
      border-radius: 0;
      padding: 5px 0;
      margin: 5px 0;
    }
    &:hover {
      background-color: $secondary-color;
      color: $tertiary-color;
      transition-duration: 500ms;
    }
  }

  & .log-button {
    font-size: 30px;
    height: 60px;
    width: 60%;
    &:hover {
      background-color: $secondary-color;
      color: $tertiary-color;
      transition-duration: 500ms;
    }

    @media screen and (max-width: map-get($breakpoints, "phone")) {
      border-radius: 30px !important  ;
    }
    @media screen and (max-width: map-get($breakpoints, "phone-small")) {
      width: 100%;
      border-radius: 0 !important;
    }
  }

  & label {
    font-family: $primary-font;
    font-weight: bolder;
  }

  & .active {
    background-color: $secondary-color !important;
    color: $tertiary-color;
  }

  @media screen and (max-width: map-get($breakpoints,"notebook" )) {
    & label {
      font-size: 18px;
    }
  }
}

footer {
  position: unset !important;
}
</style>
