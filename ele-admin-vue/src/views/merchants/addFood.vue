<template>
  <div class="add-food-wrapper">
    <!-- 添加食品种类 -->
    <div class="add-food-category-wrapper">
      <!-- 选择食品种类 -->
      <p class="mb20">选择食品种类</p>
      <el-form
        ref="categoryForm"
        label-width="110px"
        class="form"
        :model="categoryForm"
        :rules="ruleAddFoodCategory"
      >
        <el-row class="category-select">
          <el-form-item label="食品种类">
            <el-select
              v-model="categoryForm.categorySelect"
              placeholder="请选择食品种类"
              style="width:100%;"
              @change="selectFoodCategory"
            >
              <el-option
                v-for="item in categoryForm.categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
          <div class="add_category">
            <el-form-item label="食品种类" prop="name">
              <el-input v-model="categoryForm.name" />
            </el-form-item>
            <el-form-item label="种类描述" prop="description">
              <el-input v-model="categoryForm.description" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
            </el-form-item>
          </div>
        </el-row>
        <div class="add_category_button pt10" @click="showAddCategory = !showAddCategory">
          <i v-if="showAddCategory" class="el-icon-caret-top edit_icon"></i>
          <i v-else slot="icon" class="el-icon-caret-bottom edit_icon"></i>
          <span>添加食品种类</span>
        </div>
      </el-form>
      <!-- 添加食品 -->
      <p class="mb20 mt20">添加食品</p>
      <el-form
        ref="foodForm"
        label-width="110px"
        class="form food_form add_category"
        :model="foodDetail"
        :rules="ruleAddFood"
      >
        <el-form-item label="食品名称" prop="name">
          <el-input v-model="foodDetail.name" />
        </el-form-item>
        <el-form-item label="食品介绍" prop="introduce">
          <el-input v-model="foodDetail.introduce" />
        </el-form-item>
        <el-form-item label="上传食品图片" prop="image">
          <el-upload
            class="avatar-uploader textl"
            action="/api/food/updateFoodImg"
            :show-file-list="false"
            :on-success="updateAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="foodDetail.image" :src="IMAGESDOMAIN + foodDetail.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="* 价格" prop="send_price" class="textl">
          <el-input-number v-model="foodDetail.price" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item label="* 包装费" prop="send_price" class="textl">
          <el-input-number v-model="foodDetail.package_price" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFoodForm('foodForm')">{{ btnText }}</el-button>
          <el-button type="primary" @click="resetFoodForm('foodForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 食品详情 -->
    <div class="food-detail-wrapper"></div>
  </div>
</template>

<script>
import { picService } from 'common/mixins/mixins'
export default {
  mixins: [picService],
  data() {
    return {
      categoryForm: {
        categoryList: [],
        categorySelect: '',
        name: '',
        description: ''
      },
      foodDetail: {
        name: '',
        introduce: '',
        category: 0,
        image: '',
        shop_id: '',
        price: 1,
        package_price: 1
      },
      activeNames: [],
      showAddCategory: false,
      showTest: {},
      pid: this.$route.query.pid, // 商铺id
      foodId: this.$route.query.foodId, // 食品id
      editFlag: false,
      btnText: '立即添加',
      ruleAddFoodCategory: {
        // 添加食品分类校验规则
        name: [
          { required: true, message: '请输入商铺名称', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入商铺名称', trigger: 'change' }
        ]
      },
      ruleAddFood: {
        name: [
          { required: true, message: '请输入食品名称', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入食品介绍', trigger: 'change' }
        ],
        image: [{ required: true, message: '请上传食品', trigger: 'change' }],
        shop_id: [{ required: true, message: '商铺id有误', trigger: 'change' }],
        price: [
          { required: true, message: '请输入食品价格', trigger: 'change' }
        ],
        package_price: [
          { required: true, message: '请输入食品包装费', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if (!this.pid) {
      this.$message.error('请选择商铺')
      this.$router.push({ path: './merchantsList.html'})
    } else {
      const params = {
        pid: this.pid
      }
      this._getCategoryByPid(params).then(() => {
        this.isEdit()
      })
    }
  },
  methods: {
    // 是否编辑
    isEdit() {
      if (this.$route.query.isEdit && this.$route.query.isEdit == '1') {
        this.editFlag = true
        this.btnText = '立即更新'
        this._getFoodById()
      }
    },
    // 获取单个食品详情
    _getFoodById() {
      const params = {
        foodId: this.$route.query.foodId
      }
      this.Service.getFoodById(params).then((res) => {
        if (res.status === 200) {
          this.foodDetail = res.data[0]
          this.categoryForm.categorySelect = Number(this.foodDetail.category)
        } else {
          this.$message.success(res.message)
        }
      })
    },
    // 选择食品分类
    selectFoodCategory(val) {
      this.categoryForm.categorySelect = val
    },
    // 创建食品分类按钮
    submitcategoryForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._createFoodCategory()
        }
      })
    },
    // 创建食品分类
    _createFoodCategory() {
      const params = {
        pid: this.pid,
        name: this.categoryForm.name,
        desc: this.categoryForm.description
      }
      this.Service.createFoodCategory(params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.$refs['categoryForm'].resetFields()
          this._getCategoryByPid()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 创建食品按钮
    submitFoodForm(formName) {
      this.foodDetail.shop_id = this.pid
      this.foodDetail.category = this.categoryForm.categorySelect // 食品分类
      if (Number(this.foodDetail.category) === 0) {
        this.$message.error('请选择食品分类')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editFlag ? this._updateFood() : this._createdFood()
        }
      })
    },
    // 编辑食品
    _updateFood() {
      this.Service.updatedFood(this.foodDetail).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.$router.go(-1)
        }
      })
    },
    // 新增食品
    _createdFood() {
      this.Service.createdFood(this.foodDetail).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.resetFoodForm('foodForm')
        }
      })
    },
    // 图片上传之前做判断
    beforeAvatarUpload(file) {
      this.checkPic(file, 200)
    },
    // 图片上传成功回调
    updateAvatarSuccess(res) {
      if (res.status === 200) {
        this.foodDetail[res.data.attribute] = res.data.filename
      } else {
        this.$message.error(res.message)
      }
    },
    // 获取食品分类
    _getCategoryByPid() {
      const params = {
        pid: this.pid
      }
      return this.Service.getCategoryByPid(params).then(res => {
        this.categoryForm.categoryList = res.data
      })
    },
    // 重置食品信息
    resetFoodForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.add-food-wrapper {
  width: 100%;
  min-height: 100%;
  padding: 30px;
  background-color: white;
  text-align: center;
}
.add-food-category-wrapper {
  width: 58%;
  text-align: center;
  display: inline-block;
}
.category-select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form {
  border: 1px solid #eaeefb;
  border-radius: 6px;
  padding: 10px 10px 0;
}
.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit {
  height: 185px;
}
.add_category {
  padding: 20px 30px 0px 10px;
  border: 1px solid #eaeefb;
}
.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  &:hover {
    background: #f9fafc;
    span,
    .edit_icon {
      color: #20a0ff;
    }
  }
  span {
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
