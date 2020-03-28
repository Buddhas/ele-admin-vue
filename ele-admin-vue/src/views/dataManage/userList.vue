<!--
 * @Descripttion: 用户列表
 * @version: 1.0
 * @Author: 笑佛弥勒
 * @Date: 2020-01-22 16:01:53
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-28 22:09:26
 -->
<template>
  <div class="user-list-wrapper">
    <el-table :data="userList" style="width: 100%">
      <el-table-column align="center" label="用户id" prop="id" width="150" />
      <el-table-column align="center" label="用户名称" prop="user_name" />
      <el-table-column align="center" label="注册邮箱" prop="email" />
      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.created_at | _formatDate }}
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
import { formatDate } from 'common/js/util'
export default {
  data() {
    return {
      userList: [],
      page: 1,
      pageSize: 20,
      totalPage: 0
    }
  },
  mounted() {
    this._getUserList()
  },
  filters: {
    _formatDate(val) {
      return formatDate(val)
    }
  },
  methods: {
    _getUserList() {
      const params = {
        page: this.page,
        pageSize: this.pageSize
      }
      this.Service.getUserList(params).then((res) => {
        this.userList = res.data.rows
        this.totalPage = res.data.count
      })
    },
    // 改变分页
    changPage(val) {
      this.page = val
      this._getUserList()
    }
  }
}
</script>

<style lang="scss">
  .user-list-wrapper {
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>
