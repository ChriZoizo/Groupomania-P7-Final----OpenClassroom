<template>
  <section class="formularLog container">
  <div class="formularLog-container">
    <div class="formularLog__header-buttons">
    <button class="main" v-on:click="displayLogin" v-bind:class="{ active: displayLoginForm}">Connectez vous !</button>
    <button v-on:click="displaySignup" v-bind:class="{  active: displaySignupForm}">Inscrivez vous !</button>
    </div>
    <div v-show="displayLoginForm" class="form-login">
      <div class="form-login__header"><h4>Connectez vous en renseignant votre e-mail et votre mot de passe</h4></div>
      <form v-on:submit.prevent="login" id="form-login" method="post">
        <div class="form-group">
          <label for="email">E-mail :</label>
          <input
            type="email"
            id="email__login"
            name="emailLogin"
            class="form-control__login"
            placeholder="exemple@gogole.com"
            v-model="inputForm.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password"> Mot de passe :</label>
          <input
            type="password"
            id="password__login"
            name="passwordLogin"
            class="form-control__login"
            placeholder="exemple: pasazertysvp"
            v-model="inputForm.password"
            required
          />
        </div>
        <button class="log-button"> <i class="fas fa-sign-in-alt"></i> Connexion !</button>
      </form>
    </div>
    <div v-show="displaySignupForm" class="form-signup">
            <div class="form-signup__header"><h4>Pour vous inscrire, vous devez avoir un e-mail valide, un mot de passe et un nom, c'est tout ! :)</h4></div>

      <form v-on:submit.prevent="signup" id="form-signup" method="post">
        <div class="form-group">
          <label for="email">E-mail :</label>
          <input
            type="email"
            id="email__signup"
            name="emailSignup"
            class="form-control__signup"
            placeholder="exemple@gogole.com"
            v-model="inputForm.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password"> Mot de passe :</label>
          <input
            type="password"
            id="password__signup"
            name="passwordSignup"
            class="form-control__signup"
            placeholder="Ex: pasazertysvp  ( 7 Charactéres MINIMUM )"
            v-model="inputForm.password"
            required
          />
        </div>
        <div class="form-group">
          <label for="nickname"> Nom complet :</label>
          <input
            type="nickname"
            id="nickname__signup"
            name="nicknameSignup"
            class="form-control__signup"
            placeholder="Ex: Jean Desmoulin"
            v-model="inputForm.nickname"
            required
          />
        </div>
        <button class="log-button"><i class="fas fa-sign-in-alt"></i> Inscription !</button>
      </form>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      displayLoginForm: true,
      displaySignupForm: false,

      inputForm: {
        email: "",
        password: "",
        nickname: "",
      },
      /* INUTILE ? */
    };
  },

  /* METHODS */
  methods: {
    test() {},

    displayLogin() {
      this.displayLoginForm = true;
      this.displaySignupForm = false;
    },
    displaySignup() {
      this.displayLoginForm = false;
      this.displaySignupForm = true;
    },
    /* SIGNUP  */

    signup() {
      this.axios
        .post("http://localhost:3000/api/user/signup", this.inputForm)
        .then((res) => {
          console.log("Utilisateur enregistré dans la BDD ! ", res);
      this.displayLoginForm = true;
      this.displaySignupForm = false;
        })
        .catch((err) => console.log(err));
    },

    /* LOGIN */
    login() {
      let inputDatas = {
        email: this.inputForm.email,
        password: this.inputForm.password,
      };
      this.axios
        .post("http://localhost:3000/api/user/login", inputDatas)
        .then((res) => {
          
          console.log("Utilisateur connecté ! ", res);
          this.$router.push("/home");
          this.$emit("signed", res.data);
        })
        .catch((err) => console.log(err));
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
  font-size: 1.5em;
  margin: auto;
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
}

/* .border-box {
} */

.formularLog {
  margin: auto;
  width: 60%;
  opacity: 0.95;
  padding-top: 20px;
  border-radius: 30px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  align-items: center;
  & p,
  h2 {
    padding: 0 15px 0 15px;
  }

  &__header-buttons {
    display: flex;
    justify-content: center;
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
    &:hover {
      background-color: $secondary-color;
  color: $tertiary-color;
      transition-duration: 500ms;
      transform: scale(0.96);
    }
}

& .log-button {
  font-size: 30px;
  height: 60px;
  margin: 7px 10px;
  width: 60%;
      &:hover {
      background-color: $secondary-color;
  color: $tertiary-color;
      transition-duration: 500ms;
      transform: scale(0.96);
    }
}

& label {
  font-family: $primary-font;
  font-weight: bolder;
}

& .active {
  background-color: $secondary-color !important;
  color: $tertiary-color
}

    @media screen and (max-width: map-get($breakpoints,"notebook" )) {
      & label{
        font-size: 18px
      }
    }
}

footer {
  position: unset !important
}

</style>
