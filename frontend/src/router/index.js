import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import userProfil from '../views/Profil.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Error404 from '../views/Error404.vue'

const routes = [
  {
    path: '/home',
    alias: ['/', '/home'],
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
  {
    path: '/post/:id',
    name: "Post",
    component: Post
  },

  {

    path: '/profil/:id',
    name: "Profil",
    component: userProfil
  },

  {
    path:'/admin-dashboard',
    name: "AdminDashboard",
    component: AdminDashboard
  },

  {
    path: "/page-not-found",
    name: "Error404",
    component: Error404
  },

  { path: '/:catchAll(.*)', 
  beforeEnter () {
    window.location = `/page-not-found`
  }
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
