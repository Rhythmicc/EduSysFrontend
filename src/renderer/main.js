import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import backend from '@/static_storage'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import ECharts from 'echarts'

Vue.use(Element)
Vue.use(iView)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$storage = new backend()
Vue.prototype.echarts = ECharts;
Vue.http.defaults.headers['Content-Type'] = 'application/json;charset=utf-8;'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
