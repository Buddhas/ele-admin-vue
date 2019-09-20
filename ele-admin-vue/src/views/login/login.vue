<!--
 * @Descripttion: login 组件
 * @version: 1.0.1
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 08:58:00
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-15 15:11:02
 -->
<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="login-title-wrapper">ele管理后台</div>
      <el-input v-model="mobile" placeholder="请输入账号" class="mb10" />
      <el-input v-model="password" placeholder="密码" type="password" class="mb10" />
      <el-button type="primary" class="mb10 w100" @click="login">登录</el-button>
      <div class="reminder-wrapper">
        <p>温馨提示：</p>
        <p>未登录过的新用户，自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      mobile: ''
    }
  },
  methods: {
    login() {
      if (!this.validate()) {
        return
      }
      const params = {
        mobile: this.mobile,
        password: this.password
      }
      this.Service.login(params).then(res => {
        if (res.status === 200) {
          console.log(res)
          this.$message.success(res.message)
          this.$router.push({ path: './layout/dataScreen.html' })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    validate() {
      const reg = /0?(13|14|15|17|18|19)[0-9]{9}/
      if (!reg.test(this.mobile)) {
        this.$message.error('请输入正确的手机号')
        return false
      } else if (this.password.trim().length === 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: #324057;
}

.login-form {
  width: 340px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -125px;
  margin-left: -170px;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
}
.login-title-wrapper {
  position: absolute;
  text-align: center;
  width: 90%;
  top: -100px;
  font-size: 34px;
  color: #fff;
}
.reminder-wrapper {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: red;
}
</style>
