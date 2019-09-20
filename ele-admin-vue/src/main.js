/*
 * @Descripttion: 项目入口文件
 * @version: 1.0.1
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 11:20:35
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-15 11:20:35
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'
import ElementUI from 'element-ui'
import Service from './services/index'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.Service = Service

// 全局过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
