import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Menu from '@/views/Menu.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
    },
  ],
})
