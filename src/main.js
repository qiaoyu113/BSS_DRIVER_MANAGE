import Vue from 'vue'
import Vant from 'vant';
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import FastClick from 'fastclick'
import 'utils/permission'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/style/reset.less' // 常用样式
import '@/style/common.scss'
import 'vant/lib/index.less';// 全局引入Vant 样式
import defaultSettings from '@/settings'
import * as filters from '@/filters'
import global_ from 'components/Global'
import { Toast, Notify } from 'vant'
import * as directives from '@/directives'

Vue.prototype.$toast = Toast
Vue.prototype.$loading = (status) => {
  if (status) {
    Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
  } else {
    Toast.clear()
  }
}
Vue.prototype.$fail = (message) => {
  Notify({ type: 'danger', message });
}

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives)[key])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

FastClick.attach(document.body)

// options 为可选参数，无则不传
Vue.use(Vant)

Vue.component('svg-icon', SvgIcon)

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}
// var vConsole = new VConsole(option)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.GLOBAL = global_

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
