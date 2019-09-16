<!--
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 11:20:35
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-15 11:34:57
 -->
<template>
  <div id="app" class="full-contain">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Layout from '@/layouts'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
@import './style/normalize.scss';
@import './style/reset.scss';
@import './style/common.scss';
@import '~@/assets/iconfont/iconfont.css';
@import './style/base.css'
</style>
