import { createApp } from 'vue' 
import App from './App.vue'
import Vue from 'vue'
import router from './router'
import store from './store'
import 'es6-promise/auto'
/* import Vuex from 'vuex' */

/* -- FONT AWESOME -- */
/* import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' */

/* -- CREATION APP VUE -- */
createApp(App)
  .use(store)
  .use(router)
  .mount('#app') 
/* new Vue({
  router,
  store,
  mode: 'history',
  render: h => h(App)
}).$mount('#app') */

Vue.config.productionTip = false

const axios = require('axios').default

Vue.prototype.$axios = axios
/* Vue.component('font-awesome-icon', FontAwesomeIcon) */
