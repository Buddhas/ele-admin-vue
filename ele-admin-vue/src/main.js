/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 11:20:35
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-15 11:20:35
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import filters from './filters'
import ElementUI  from "element-ui";

Vue.use(ElementUI)

Vue.config.productionTip = false

// 如果是非线上环境，加载 VConsole（移动端适用）
// if (process.env.NODE_ENV !== 'production') {
//     var VConsole = require('vconsole/dist/vconsole.min.js');
//     var vConsole = new VConsole();
// }

// 全局过滤器
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
