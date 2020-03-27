/*
 * @Descripttion: 项目入口文件
 * @version: 1.0.1
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 11:20:35
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-27 23:33:38
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'
import ElementUI from 'element-ui'
import Service from './services/index'
import { globalSetting } from './common/mixins/mixins'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.Service = Service

// 全局过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})
Vue.mixin({
  mixins: [globalSetting]
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
