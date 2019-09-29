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
              :placeholder="selectValue.label"
              style="width:100%;"
            >
              <el-option
                v-for="item in categoryForm.categoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
        <div class="add_category_button" @click="showAddCategory = !showAddCategory">
          <i v-if="showAddCategory" class="el-icon-caret-top edit_icon"></i>
          <i v-else slot="icon" class="el-icon-caret-bottom edit_icon"></i>
          <span>添加食品种类</span>
        </div>
      </el-form>
      <!-- 添加食品 -->
      <p class="mb20 mt20">添加食品</p>
      <el-form label-width="110px" class="form food_form add_category" :model="foodDetail">
        <el-form-item label="食品名称" prop="name">
          <el-input v-model="foodDetail.name" />
        </el-form-item>
        <el-form-item label="食品介绍" prop="introduce">
          <el-input v-model="foodDetail.introduce" />
        </el-form-item>
        <el-form-item label="食品介绍" prop="introduce">
          <el-input v-model="foodDetail.name" />
        </el-form-item>
        <el-form-item label="上传食品图片" prop="catering_license">
          <el-upload
            class="avatar-uploader textl"
            action="/merchants/updateCateringLicense"
            :show-file-list="false"
            :on-success="updateAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="foodDetail.image" src class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格" prop="send_price" class="textl">
          <el-input-number
            v-model="foodDetail.price"
            controls-position="right"
            :min="1"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="包装费" prop="send_price" class="textl">
          <el-input-number
            v-model="foodDetail.package_price"
            controls-position="right"
            :min="1"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
    </div>
    <!-- 食品详情 -->
    <div class="food-detail-wrapper"></div>
  </div>
</template>

<script>
export default {
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
        category: '',
        image: '',
        shop_id: '',
        price: '',
        package_price: ''
      },
      activeNames: [],
      showAddCategory: true,
      showTest: {},
      pid: '123',
      ruleAddFoodCategory: {
        // 添加食品分类校验规则
        name: [
          { required: true, message: '请输入商铺名称', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入商铺名称', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this._getCategoryByPid()
  },
  methods: {
    selectValue() {},
    handleChange() {},
    // 创建食品分类
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
      this.Service.createFoodCategory(params).then(res => {})
    },
    // 图片上传之前做判断
    beforeAvatarUpload() {},
    // 图片上传成功回调
    updateAvatarSuccess() {},
    // 获取食品分类
    _getCategoryByPid() {
      const params = {
        pid: this.pid
      }
      this.Service.getCategoryByPid(params).then(() => {})
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
