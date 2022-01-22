import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
/* import formSignup from '../views/Signup.vue'
import formLogin from '../views/Login.vue' */
import userProfil from '../views/Profil.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
/*   {
    path: '/signup',
    name: 'Signup',
    component: formSignup
  },
  {
    path: '/login',
    name: 'Login',
    component: formLogin
  }, */
  {

    path: '/profil',
    name: "Profil",
    component: userProfil
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
