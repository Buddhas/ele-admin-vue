/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 08:19:18
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 22:02:18
 */
import Vue from 'vue'
import Router from 'vue-router'

// 按需（懒）加载（vue实现）
const login = () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
const layout = () => import(/* webpackChunkName: "layout" */ '../views/layout/layout.vue')
const dataScreen = () => import(/* webpackChunkName: "dataScreen" */ '../views/dataScreen/dataScreen.vue')
const addMerchants = () => import(/* webpackChunkName: "addMerchants" */ '../views/merchants/addMerchants.vue')
const addFood = () => import(/* webpackChunkName: "addFood" */ '../views/merchants/addFood.vue')
const merchantsList = () => import(/* webpackChunkName: "merchantsList" */ '../views/dataManages/merchantsList.vue')
const foodList = () => import(/* webpackChunkName: "foodList" */ '../views/dataManages/foodList.vue')
const adminList = () => import(/* webpackChunkName: "adminList" */ '../views/dataManages/adminList.vue')
const orderList = () => import(/* webpackChunkName: "orderList" */ '../views/dataManages/orderList.vue')
const userList = () => import(/* webpackChunkName: "userList" */ '../views/dataManages/userList.vue')
const setting = () => import(/* webpackChunkName: "setting" */ '../views/setting/setting.vue')

Vue.use(Router)

// const base = `${process.env.BASE_URL}` // 动态获取二级目录

const router = new Router({
  mode: 'history',
  base: '/vue',
  routes: [
    {
      path: '/login.html',
      name: 'login',
      component: login
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      redirect: '/layout/dataScreen.html',
      meta: { needLogin: true },
      children: [
        {
          path: 'dataScreen.html',
          name: 'dataScreen',
          meta: ['添加数据', '添加商铺'],
          component: dataScreen
        },
        {
          path: 'merchantsList.html',
          name: 'merchantsList',
          meta: ['数据管理', '商家列表'],
          component: merchantsList
        },
        {
          path: 'addMerchants.html',
          name: 'addMerchants',
          meta: ['添加数据', '添加商铺'],
          component: addMerchants
        },
        {
          path: 'addFood.html',
          name: 'addFood',
          meta: ['添加数据', '添加食品'],
          component: addFood
        },
        {
          path: 'foodList.html',
          name: 'foodList',
          meta: ['添加数据', '食品列表'],
          component: foodList
        },
        {
          path: 'setting.html',
          name: 'setting',
          meta: ['设置', '管理员设置'],
          component: setting
        },
        {
          path: 'adminList.html',
          name: 'adminList',
          meta: ['设置', '管理员列表'],
          component: adminList
        },
        {
          path: 'orderList.html',
          name: 'orderList',
          meta: ['设置', '订单列表'],
          component: orderList
        },
        {
          path: 'userList.html',
          name: 'userList',
          meta: ['设置', '用户列表'],
          component: userList
        }
      ]
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
