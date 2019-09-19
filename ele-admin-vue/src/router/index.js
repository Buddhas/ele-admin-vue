/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 08:19:18
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-15 11:30:24
 */
import Vue from 'vue'
import Router from 'vue-router'

// 按需（懒）加载（vue实现）
const Login = () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
const Layout = () => import(/* webpackChunkName: "layout" */ '../views/layout/layout.vue')
const dataScreen = () => import(/* webpackChunkName: "layout" */ '../views/dataScreen/dataScreen.vue')

Vue.use(Router)

const base = `${process.env.BASE_URL}` // 动态获取二级目录

const router = new Router({
  mode: 'history',
  base: base,
  routes: [
    {
      path: '/login.html',
      name: 'login',
      component: Login
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [{
        path: 'dataScreen.html',
        name: 'dataScreen',
        meta: ['添加数据', '添加商铺'],
        component: dataScreen
      }]
    },
    {
      path: '*',
      redirect: '/login.html'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  // 做些什么，通常权限控制就在这里做哦

  // 必须写next()哦，不然你的页面就会白白的，而且不报错，俗称"代码下毒"
  next()
})

export default router
