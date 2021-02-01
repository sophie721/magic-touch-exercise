// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from '../store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
