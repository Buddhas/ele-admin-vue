<!--
 * @Descripttion: 管理员列表组件
 * @version: 1.0
 * @Author: 笑佛弥勒
 * @Date: 2020-01-22 16:01:53
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-28 22:09:46
 -->
<template>
  <div class="admin-list-wrapper">
    <el-table :data="adminData" style="width: 100%">
      <el-table-column align="center" prop="user_name" label="姓名" />
      <el-table-column align="center" prop="registe_time" label="注册日期" />
      <el-table-column align="center" label="管理员">
        <template slot-scope="scope">
          <span v-if="scope.row.permissions == 1">管理员</span>
          <span v-else>超级管理员</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPage"
      :page-size="pageSize"
      class="absoulute"
      @current-change="changPage"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminData: [],
      page: 1,
      pageSize: 20,
      totalPage: 1
    }
  },
  mounted() {
    this._getAdmin()
  },
  methods: {
    _getAdmin() {
      const params = {
        page: this.page,
        pageSize: this.pageSize
      }
      this.Service.findAdminByPage(params).then(res => {
        if (res.status === 200) {
          this.adminData = res.data.rows
          for (let i = 0; i < this.adminData.length; i++) {
            this.adminData[i].registe_time = this.formatData(
              this.adminData[i].registe_time
            )
          }
          this.totalPage = res.data.count
        } else {
          this.$message.error('获取管理员列表失败')
        }
      })
    },
    // 格式化时间
    formatData(time) {
      const date = new Date(time)
      return `${date.getFullYear()}-${this.addZero(
        date.getMonth() + 1
      )}-${this.addZero(date.getDate())}`
    },
    changPage(size) {
      this.page = size
      this._getAdmin()
    },
    addZero(m) {
      return m < 10 ? '0' + m : m
    }
  }
}
</script>

<style lang="scss">
.admin-list-wrapper {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
