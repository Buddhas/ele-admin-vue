<template>
  <div class="data-screen-wrapper">
    <p class="title">数据统计</p>
    <div class="data-screen">
      <el-row>
        <el-col :span="4" class="mr10 current-title">
          <div class="grid-content current-title">当日数据：</div>
        </el-col>
        <el-col :span="4" class="mr10">
          <div class="data-content">新增用户</div>
        </el-col>
        <el-col :span="4" class="mr10">
          <div class="data-content">新增订单</div>
        </el-col>
        <el-col :span="4" class="mr10">
          <div class="data-content">新增管理员</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.data-screen-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
}
.title {
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  color: black;
}
.current-title {
  line-height: 36px;
  text-align: center;
  border-radius: 4px;
  color: white;
  background-color: #ff9800;
}
.data-content {
  line-height: 36px;
  text-align: center;
  border-radius: 4px;
  color: black;
  background-color: #e5e9f2
}
</style>
