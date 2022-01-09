<template>
  <div class="form-signup">
    <h2>Formulaire d'inscription</h2>
    <form v-on:submit.prevent="signup" id="form-signup" method="post">
      <div class="form-group">
        <label for="email">E-mail :</label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          placeholder="exemple@gogole.com"
          v-model="inputForm.email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password"> Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          placeholder="exemple: pasazertysvp"
          v-model="inputForm.password"
          required
        />
      </div>
      <button>Inscription</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",

  data() {
    return {
      inputForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      let inputDatas = {
        email: this.inputForm.email,
        password: this.inputForm.password,
      };
      this.axios
        .post("http://localhost:3000/api/user/signup", inputDatas)
        .then((res) => console.log("Utilisateur enregistré dans la BDD ! ", res))
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

.border-box {
}

.form-signup {
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
