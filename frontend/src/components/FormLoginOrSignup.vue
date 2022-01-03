
<template>
  <div class="login">
    <div class="login_container">
      <img
        alt="Groupomania logo"
        src="../assets/icon-left-font-monochrome-white.svg"
      />
      <form>
        <div>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="  Adresse mail"
            required
          />
        </div>
        <div>
          <input
            v-model="name"
            id="name"
            placeholder="  Prénom"
            required
            v-if="mode == 'create'"
          />
        </div>
        <input
          v-model="lastname"
          id="lastname"
          placeholder="  Nom"
          required
          v-if="mode == 'create'"
        />
        <div>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="  Mot de passe"
            required
          />
        </div>

        <div
          class="invalid-login-info"
          v-if="mode == 'login' && status == 'error_login'"
        >
          Adresse mail et/ou mot de passe invalide
        </div>
        <div
          class="invalid-login-info"
          v-if="mode == 'create' && status == 'error_create'"
        >
          Adresse mail déjà utilisé
        </div>

        <button
          v-if="mode == 'login'"
          :class="{ disabled__btn: !validated }"
          @click.prevent="loginAccount()"
        >
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button
          v-if="mode == 'create'"
          :class="{ disabled__btn: !validated }"
          @click.prevent="createAccount()"
        >
          <span v-if="status == 'loading'">Inscription en cours...</span>
          <span v-else>Inscription</span>
        </button>
      </form>
      <p v-if="mode == 'login'">
        Pas encore inscrit ?
        <span class="createAccountBtn" @click="createAccountSwitch()"
          >Créer un compte</span
        >
      </p>
      <p v-if="mode == 'create'">
        Déjà inscrit ?
        <span class="createAccountBtn" @click="loginAccountSwitch()"
          >Se connecter</span
        >
      </p>
    </div>
  </div>
</template>



    <script>
    export default {
        name: 'FormLoginOrSignup',
        props: {
            message: String
        }
    }
    </script>


<style lang="scss">
.login {
  // background-color: #ccffcc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_container {
    width: 25rem;
    background-color: #161b22;
    border-radius: 1rem;
    padding: 2rem;
    img {
      width: 10rem;
      margin-bottom: 2rem;
    }
    .invalid-login-info {
      margin: 1rem 0;
    }
    input,
    button {
      margin-bottom: 0.5rem;
      width: 95%;
      height: 2rem;
      border-radius: 0.5rem;
      border: none;
      background-color: #3a3b3c;
      color: #acb8c8;
    }
    button {
      border: 2px #00b300 solid;
      cursor: pointer;
    }
    .createAccountBtn {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
    .disabled__btn {
      border: 1px #9e9a9a solid;
    }
  }
}
</style>
