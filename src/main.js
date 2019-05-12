// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {$axios} from './utils'
import 'normalize.css'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = $axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
