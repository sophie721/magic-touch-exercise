import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '@/views/Home.vue'
import Menu from '@/views/Menu.vue'

const routes = [
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
];

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,
})
