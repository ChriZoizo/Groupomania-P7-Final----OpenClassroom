<template>
  <div class="formularLog">
    <button v-on:click="displayLogin">Connexion</button>
    <button v-on:click="displaySignup"> Formulaire d'inscription</button>
    <div v-show="displayLoginForm" class="form-login">
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
        <button>Connexion</button>
      </form>
    </div>
    <div v-show="displaySignupForm" class="form-signup">
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
            placeholder="Ex: pasazertysvp"
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
        <button>Inscription</button>
      </form>
    </div>
    <button v-on:click="test">TEST formLogin</button>
  </div>
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
form {
  margin-top: 25px;
}
button {
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
  align-items: center;
  & p,
  h2 {
    padding: 0 15px 0 15px;
  }
}
</style>
