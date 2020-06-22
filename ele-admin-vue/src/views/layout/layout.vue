<template>
  <div class="layout-wrapper">
    <el-container class="container-wrapper">
      <!-- 头部 -->
      <el-header class="header-wrapper">
        <span class="textl fs20 white">管理后台</span>
        <div class="textr flex1">
          <el-dropdown>
            <i class="el-icon-setting mr15"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="logOut">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ userMsg.user_name }}</span>
        </div>
      </el-header>
      <!-- 侧边栏+内容 -->
      <el-container style="width:100%">
        <!-- 侧边栏 -->
        <el-aside width="12%" height="100%">
          <el-menu
            :default-active="defaultActive"
            background-color="#FFFEFF"
            text-color="black"
            active-text-color="#20A1FC"
            style="height:100%"
            router
          >
            <el-menu-item index="dataScreen.html">
              <i class="el-icon-menu"></i>首页
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>数据管理
              </template>
              <el-menu-item index="userList.html">用户列表</el-menu-item>
              <el-menu-item index="merchantsList.html">商家列表</el-menu-item>
              <el-menu-item index="foodList.html">食品列表</el-menu-item>
              <!-- <el-menu-item index="orderList.html">订单列表</el-menu-item> -->
              <el-menu-item index="adminList.html">管理员列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-plus"></i>添加数据
              </template>
              <el-menu-item index="addMerchants.html">添加商铺</el-menu-item>
              <el-menu-item index="addFood.html">添加食品</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-star-on"></i>图表
              </template>
              <el-menu-item index="visitor">用户分布</el-menu-item>
            </el-submenu> -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>设置
              </template>
              <el-menu-item index="setting.html">管理员设置</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-warning"></i>说明
              </template>
              <el-menu-item index="explain">说明</el-menu-item>
            </el-submenu> -->
          </el-menu>
        </el-aside>
        <!-- 内容 -->
        <el-main :style="{'height': mainHeight}">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="main-top">
            <el-breadcrumb-item :to="{ path: '/layout/dataScreen.html' }" class="ml10">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainHeight: {
        maxHeight: ''
      },
      userMsg: {}
    }
  },
  computed: {
    defaultActive: function() {
      // 路由改变会触发replace
      return this.$route.path.replace('/layout/', '')
    }
  },
  created() {
    this.getUserMsg()
  },
  mounted() {
    this.getMainHeight()
  },
  methods: {
    logOut() {
      this.Service.logOut().then((res) => {
        if (res.status == 200) {
          this.$message.success('退出登录成功')
          this.$router.push({ path: '/login.html' })
        }
      })
    },
    // 获取用户信息
    getUserMsg() {
      this.Service.isLogin().then((res) => {
        this.userMsg = res.data
      })
    },
    getMainHeight() {
      // 减去头部高度+页数高度
      this.mainHeight = document.body.clientHeight - 60 - 40 + 'px'
    }
  }
}
</script>

<style lang="scss">
@import '../../style/mixin';

.layout-wrapper {
  width: 100%;
  height: 100%;
}
.container-wrapper {
  height: 100%;
  width: 100%;
  border: 1px solid #eee;
}
.header-wrapper {
  font-size: 12px;
  background-color: #20a1fc;
  line-height: 60px;
  display: flex;
}
.main-top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: right;
  background-color: #eff2f7;
}
</style>
