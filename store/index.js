import { createStore } from 'vuex'
import menu from './menu'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: { menu },
  strict: debug,
})
