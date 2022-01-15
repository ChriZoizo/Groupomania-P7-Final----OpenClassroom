import { createApp/* , VueElement  */} from 'vue'
import App from './App.vue'
import router from './router'
/* import store from './store' !!! VUEX*/
import 'es6-promise/auto'
import axios from 'axios'
/* const axios = require('axios').default  */

/* -- FONT AWESOME -- */
/* import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' */

/* -- CREATION APP VUE -- */
const app = createApp(App)
  .use(router)
/*   .use(store)  !!! VUEX */

app.config.globalProperties.axios = axios
/* Vue.config.productionTip = false */
app.mount('#app')

/* Vue.prototype.$axios = axios */
/* Vue.component('font-awesome-icon', FontAwesomeIcon) */
