<template>
  <div class="food-list-wrapper">
    <el-table :data="foodData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="食品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.score }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.mon_sale }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" prop="name" />
      <el-table-column label="食品介绍" prop="introduce" />
      <el-table-column label="评分" prop="score" />
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      foodData: [],
      page: 1,
      pageSize: 20,
      totalPage: 0
    }
  },
  mounted() {
    this._findFoodByPage()
  },
  methods: {
    // 改变分页
    changPage(val) {
      this.page = val
      this._findFoodByPage()
    },
    // 获取食品列表
    _findFoodByPage() {
      const params = {
        page: this.page,
        pageSize: this.pageSize
      }
      this.Service.findFoodByPage(params).then(res => {
        if (res.status === 200) {
          this.foodData = res.data.rows
          this.totalPage = res.data.count
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 编辑按钮
    handleEdit(index, data) {
      this.$router.push({
        path: '../layout/addFood.html',
        query: { pid: data.shop_id, foodId: data.id, isEdit: '1' }
      })
    },
    // 删除按钮
    handleDelete(index, data) {
      const params = {
        foodId: data.id
      }
      this.Service.deleteFood(params).then(res => {
        if (res.status === 200) {
          this.$message.success('删除食品成功')
          this.page = 1
          this._findFoodByPage()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.food-list-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
}
.absoulute {
  position: fixed;
  bottom: 10px;
  right: 40px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
