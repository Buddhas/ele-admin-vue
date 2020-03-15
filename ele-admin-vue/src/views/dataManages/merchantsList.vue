<template>
  <div class="merchants-list-wrapper">
    <el-table :data="merchantsData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商铺名称:">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商铺地址:">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商铺id:">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话:">
              <span>{{ props.row.mobile }}</span>
            </el-form-item>
            <el-form-item label="商铺评分:">
              <span>{{ props.row.score }}</span>
            </el-form-item>
            <el-form-item label="分类:">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商铺名称" prop="name" />
      <el-table-column label="商铺地址" prop="address" />
      <el-table-column label="商铺介绍" prop="synopsis" />
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleAdd(scope.row)">添加食品</el-button>
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
      merchantsData: [],
      page: 1,
      pageSize: 20,
      totalPage: 0
    }
  },
  mounted() {
    this._getMerchants()
  },
  methods: {
    // 改变分页
    changPage(val) {
      this.page = val
      this._getMerchants()
    },
    handleEdit(index, data) {
      this.$router.push({
        path: '../layout/addMerchants.html',
        query: { isEdit: 1, merchantsId: data.id }
      })
    },
    handleAdd(detail) {
      this.$router.push({ path: '/layout/addFood.html', query: { pid: detail.id }})
    },
    // 获取商家分类
    _getCategory() {
      this.Service.getCategory().then(res => {
        if (res.status === 200) {
          this.merchantsCategory = res.data
          this.setCategory()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取商家列表
    _getMerchants() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        orderType: 0
      }
      this.Service.getMerchantsByPage(params).then(res => {
        if (res.status === 200) {
          this.merchantsData = res.data.rows
          this.totalPage = res.data.count
          this._getCategory()
        } else {
          this.$message.error('查询出错')
        }
      })
    },
    // 设置商家分类
    setCategory() {
      let firstCat = ''
      let secondCat = ''
      for (let i = 0; i < this.merchantsData.length; i++) {
        // 一级分类
        for (let j = 0; j < this.merchantsCategory.length; j++) {
          if (
            this.merchantsCategory[j].id == this.merchantsData[i].first_category
          ) {
            firstCat = this.merchantsCategory[j].name
            for (let k = 0; k < this.merchantsCategory[j].child.length; k++) {
              if (
                this.merchantsCategory[j].child[k].id ==
                this.merchantsData[i].second_category
              ) {
                secondCat = this.merchantsCategory[j].child[k].name
                this.merchantsData[i].category = `${firstCat}/${secondCat}`
              }
            }
          }
          firstCat = ''
          secondCat = ''
        }
      }
    },
    // 删除商家
    handleDelete(index, data) {
      const params = {
        id: data.id
      }
      this.Service.deleteMerchants(params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.page = 1
          this._getMerchants()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.merchants-list-wrapper {
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
