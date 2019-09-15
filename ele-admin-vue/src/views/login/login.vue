<!--
 * @Descripttion: login 组件
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-09-15 08:58:00
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-15 15:11:02
 -->
<template>
    <div class="login-wrapper">
        <div class="login-form">
            <el-input v-model="input" placeholder="请输入内容" ></el-input>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: ''
        }
    }
}
</script>

<style lang="scss">
    @import "../../style/mixin.scss";
    .login-wrapper {
        width: 100%;
        height: 100%;
        background-color: #324057;
    }
    .login-form {
        width: 320px;
        height: 210px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -105px;
        margin-left: -160px;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;

    }
    .input-wrapper {
        
    }
</style>