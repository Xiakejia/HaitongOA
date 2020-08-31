import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProjectRector from '../views/projectrector/projectList'
import Welcome from "../views/Welcome";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/welcome', // 重定向到 "/welcome"
    children: [
      {path: '/toList', name: 'ProjectRector', component: ProjectRector},
      {path: '/welcome', name: 'Welcome', component: Welcome}
    ]

  },
  {
    path: '/about',
    name: 'About',
    /* 异步加载 */
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
