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
              @keypress="checkEmail('email__login')"
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
              @keypress="checkPassword('password__login')"
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
              @keypress="checkEmail('email__signup')"
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
              @keypress="checkPassword('password__signup')"
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
              @keypress="checkNickname('nickname__signup')"
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
  </section>
  <!-- * END SECTION formularLog END -->
</template>

<script>
/* -- SCRIPT -- */
export default {
  name: "LoginSignup",

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
      this.checkInputDatas(this.inputForm);
      this.axios
        .post("http://localhost:3000/api/user/signup", this.inputForm)
        .then(() => {
          this.displayLogin();
          this.checkInputDatas(this.inputForm);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /*. checkInputDatas : Methode qui est appelé lors d'une tentative de connexion/inscriptions par la methode 'login()'
    Elle affiche des alertes si des characteres non valide sont entrées */
    checkInputDatas(datas) {
      let email = datas.email;
      let password = datas.password;
      let nickname = datas.nickname || false;
      const regExChecker = /[&<>\\`"{}]/; /* RegEx qui verifie le format et la validitée globale des charactéres  */ /* RegEx qui permet de detecter les characteres dangeureux. Previent les injections de codes */
        /* Email Checking */
      if (regExChecker.test(email)) {
        /* declaration de la constante contenant les données de l'alerte */
        const alertData = {
          type: "error",
          content: "Votre Email contient un ou plusieurs charactére non valide",
          header: "Email Incorrect !",
        };
        /* Emission de l'evenement (nommé 'alert') accompagné par la constante ci-dessus */
        this.$emit("alert", alertData);
      }
      /* Mot de passe Checking */
      if (regExChecker.test(password)) {
        const alertData = {
          /* declaration de la constante contenant les données de l'alerte */
          type: "error",
          content: `votre Mot de Passe contient un ou plusieurs charactéres non valide`,
          header: `Mot de Passe incorrect !`,
        };
        /* Emission de l'evenement (nommé 'alert') accompagné par la constante ci-dessus */
        this.$emit("alert", alertData);
      }
      /* Nickname Checking */
      if (nickname !== false && regExChecker.test(nickname)) {
        /* declaration de la constante contenant les données de l'alerte */
        const alertData = {
          type: "error",
          content:
            "Votre nom, surnom, appelez ça comme vous voulez, mais il y a des charactéres invalide !",
          header: "Inscription Echoué !",
        };
        /* Emission de l'evenement (nommé 'alert') accompagné par la constante ci-dessus */
        this.$emit("alert", alertData);
      }
    },

    /*. checkEmail : Methode qui est appelé a change fois que l'utilisateur entre une lettre dans un des textInput 'email'.
    Accepte en parametre l''id' de l'element HTML concerné (du formulaire login ou signup).
    Elle posséde 2 constante qui contiennent deux "RegEx" different.
    'regExChecker' : verifie la presence de charactéres dangeureux, qui pourrait etre utilisé pour injecter du code
    'emailRegExChecker : qui verifie si le format et les lettres utilisé sont correct pour un email.
    - A chaque frappe utilisateur dans ce champ, la methode verifie la Data v-bind a a l'input. 
    - Si il n'y as pas de charactére dangeureux et que son format respect le format "Email", appel la fonction 'displayDOMValidator' en passant
    l''ID' du champ concerné, ainsi que le String 'valid'.
    - Si il y a un characteres dangereux ou que le format n'est pas valide et que il y a plus de 7 charactere, appel la fonction 'displayDOMValidator' en passant
    l''ID' du champ concerné, ainsi que le String 'invalid'. */
    checkEmail(inputField) {
      const email = this.inputForm
        .email; /* Data email qui est v-bind avec les champs 'email' des formulaires */
      const regExChecker = /[&<>\\`"{}]/; /* RegEx qui permet de detecter les characteres dangeureux. Previent les injections de codes */
      const emailRegexChecker = /^[^@]+@[^@]+\.[^@]+$/; /* RegEx qui verifie le format et la validitée globale des charactéres  */

      this.displayDOMValidator(
        inputField,
        "none"
      ); /* Enleve le style. Invisible a l'oeil. Cela permet d'enlever l'alerte lorsque il n'y a pas de problemes */

      /* Si 'email' ne contient pas un charactere dangeureux et qu'il respecte le format "Email" */
      if (!regExChecker.test(email) && emailRegexChecker.test(email)) {
        /* Appelle cette fonction qui affichera une border verte autour du champ, signifiant a l'utilisateur que tout vas bien */
        this.displayDOMValidator(inputField, "valid");
      } else if (
        /* Si 'email' contient un charactere dangeureux et qu'il ne respecte pas le format "Email" apres 7 characteres entré */
        (regExChecker.test(email) && !emailRegexChecker.test(email)) ||
        email.length > 7
      ) {
        /* Appelle cette fonction qui affichera une border rouge autour du champ, signifiant a l'utilisateur qu'il y a un probleme */
        this.displayDOMValidator(inputField, "invalid");
      }
    },

    /*. checkPassword : Fonctionne comme la fonction 'checkEmail'. Verifie uniquement la presence de charactere dangeureux et la longueur 
    Declare 'password' qui est la Data 'inputForm.password'. Le RegEx 'regExChecker' qui sert toujours a verifier la presence de cvharactere dangeureux.
    -Si 'password' ne contient pas de charactere dangeureux, et qu'il y au moins 7 charactere, appel la fonction 'displayDOMValidator' en passant
    l''ID' du champ concerné, ainsi que le String 'valid'.
    - Si 'password' contient un charactere dnageureux OU fait moins de 7 characteres, , appel la fonction 'displayDOMValidator' en passant
    l''ID' du champ concerné, ainsi que le String 'invalid'.
    */
    checkPassword(inputField) {
      let password = this.inputForm.password; /* Data 'password' */
      const regExChecker = /[&<>\\`"{}]/; /* RegEx qui permet de detecter les characteres dangeureux. Previent les injections de codes */
      /* Si le test() avec le 'RegExChecker' est negatif, et qu'il y a plus de 6 charactere */
      if (!regExChecker.test(password) && password.length > 5) {
        this.displayDOMValidator(
          inputField,
          "valid"
        ); /* Appelle cette fonction qui affichera une border verte autour du champ, signifiant a l'utilisateur que tout vas bien */
        /* Sinon */
      } else if (regExChecker.test(password) || password.length < 7) {
        this.displayDOMValidator(
          inputField,
          "invalid"
        ); /* Appelle cette fonction qui affichera une border rouge autour du champ, signifiant a l'utilisateur qu'il y a un probleme */
      }
    },

    /*. checkNickname : Fonctionne de la meme façon que la methode ci-dessus, mais avec lme 'nickname' */
    checkNickname(inputField) {
      let nickname = this.inputForm.nickname; /* Data 'nickname */
      const regExChecker = /[&<>\\`"{}]/; /* RegEx Checker */
      /* Si tout va bien */
      if (!regExChecker.test(nickname) && nickname.length > 1) {
        this.displayDOMValidator(inputField, "valid");
        /* Sinon */
      } else if (regExChecker.test(nickname) || nickname.length <2) {
        this.displayDOMValidator(inputField, "invalid");
      }
    },

    /*. displayDOMValidator : Cette methode est appelé par d'autres methodes afin d'jouter un contour de couleur, pour donner des indications visuelles a l'utilisateur.
Elle accepte deux String en parametre. le parametre 'field' est l"ID" HTML du l'input concerné. Le parametre 'status' est une String. 
-Si 'Case' cette string est 'valid', alors la methode va chqnger la border-color de l'input de la couleur primaire de l'application.
-Si 'Case' cette string est 'invalid', alors la methode va changer la border-color de l'input en rouge.
-Par defaut, defini la border-color sur 'Unset'

@params
  << field = String 
  << status = String  
*/
    displayDOMValidator(field, status) {
      /* Declare dans une variable l'element DOM 'champ' */
      const element = document.getElementById(field);
      /* Switch qui va se baser sur le parametre 'field' */
      switch (status) {
        case "valid":
          element.style.borderColor = "#00adb5";
          break;
        case "invalid":
          element.style.borderColor = "red";
          break;
        default:
          element.style.borderColor = "unset";
      }
    },

    /*. login : Cette methode permet a l'utilisateur de se connecter a l'application via un appel a l'API (POST) avec l'email et le MdP renseigné (Promise)
    - Elle recupere les Datas 'inputForm.email' et 'inputForm.password', créer un nouvel objet 'inputDatas' avec.
    - Appelle la fonction checkInputDatas en passant l'objet créé precedemment en parametre.
    - Puis fait un appel a l'API en passant l'objet (toujours lui) dans le body de la requete
    - Puis 'Then' emet un Event grace a "$emit" pour communiquer a l'application que l'utilisateur est bien connecté + les données de l'utilisateur qui s'est connecté
    - Sinon 'Catch' affiche l'erreur dans la console */
    login() {
      /* Creation d'un nouvel objet avec les Datas necessaires */
      let inputDatas = {
        email: this.inputForm.email,
        password: this.inputForm.password,
      };
      /* Appel une methode pour checker si les données sont conforme, et afficher une alerte si il y a un probleme */
      this.checkInputDatas(inputDatas);
      /*  Appel a l'API en passant l'objet 'inputDatas' */
      this.axios
        .post("http://localhost:3000/api/user/login", inputDatas)
        .then((res) => {
          /* Si tout ce passe bien, envoit un event a App.Vue, avec les données du 'User' connecté que la BDD a renvoyé */
          this.$emit("signed", res.data);
        })
        .catch((err) => {
          console.log(err);
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
