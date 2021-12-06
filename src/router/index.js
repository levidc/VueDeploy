import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { getCookie } from '@/utils/auth'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () =>
      import(/* webpackChunkName: "carousel" */ '../views/carousel.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 路由懒加载
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/404',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/404Not.vue')
  }, {
    path: '*', // 此处需特别注意置于最底部
    redirect: '/404'
  }
]

const router = new VueRouter({
  base: '/VueDeploy/dist/',
  routes,
  // mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  console.log(to)
  var validCookie = getCookie()
  if (validCookie) {
    if (to.path !== '/login') {
      next()
    } else {
      next({ path: '/' })
    }
  } else if (to.path === '/login') {
    next()
  } else {
    next({ path: '/login' })
  }
})
export default router
