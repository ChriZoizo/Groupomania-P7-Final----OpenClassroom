/* Importation des modules requis */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'es6-promise/auto'
import axios from 'axios'

/* Declaration et creation de l'application "App", en precisant qu'il doit utiliser le routeur 'router' (pas trés original, je sais..)  */
const app = createApp(App)
.use(router)

/* 'middleware' ajoutant automatiquement le 'token' de l'utilisateur connecté dans le header de la requéte en interceptant
les requetes envoyé par "Axios" a l'API. Le backend utilisant "Authorize" pour assurer une partie de la securtié (voir dans backend/middleware) */
axios.interceptors.request.use(
  (config) => {
      let token = localStorage.getItem("userToken")
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  
  (error) => {
      return Promise.reject(error);
  })
app.config.globalProperties.axios = axios

/* Vue.config.productionTip = false */

app.mount('#app')

