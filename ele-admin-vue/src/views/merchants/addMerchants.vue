<template>
  <div class="add-merchants-wrapper">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="商铺名称" prop="name">
        <el-input v-model="ruleForm.name" class="w500" />
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="ruleForm.address" class="w500" />
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="ruleForm.mobile" class="w500" />
      </el-form-item>
      <el-form-item label="商铺简介" prop="synopsis">
        <el-input v-model="ruleForm.synopsis" class="w500" />
      </el-form-item>
      <el-form-item label="商铺标语" prop="slogan">
        <el-input v-model="ruleForm.slogan" class="w500" />
      </el-form-item>
      <el-form-item label="商铺分类" prop="category">
        <el-cascader v-model="ruleForm.category" :options="categoryOptions" @change="handleChange" />
      </el-form-item>
      <el-form-item label="配送费" prop="ship_price">
        <el-input-number
          v-model="ruleForm.ship_price"
          controls-position="right"
          :min="1"
          :max="20"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="起送价" prop="send_price">
        <el-input-number
          v-model="ruleForm.send_price"
          controls-position="right"
          :min="1"
          :max="20"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="营业时间" prop="">
        <el-time-select
          v-model="ruleForm.start_time"
          class="mr20"
          placeholder="起始时间"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'}"
        />
        <el-time-select
          v-model="ruleForm.end_time"
          placeholder="结束时间"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: ruleForm.start_time}"
        />
      </el-form-item>
      <el-form-item label="上传商铺头像" prop="shop_avatar">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.shop_avatar" src="ruleForm.shop_avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传营业执照" prop="business_license">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.business_license" src="ruleForm.business_license" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传餐饮许可证" prop="catering_license">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.catering_license" src="" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        address: '',
        mobile: '',
        synopsis: '', // 商铺简介
        slogan: '', // 商铺标语
        category: [],
        ship_price: 0,
        send_price: 0,
        start_time: '',
        end_time: '',
        shop_avatar: '',
        business_license: '',
        catering_license: '',
        longitude: '',
        latitude: ''
      },
      rules: {
        name: [{ required: true, message: '请输入商铺名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请选择商铺地址', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请填写联系电话', trigger: 'change' }
        ],
        synopsis: [
          { required: true, message: '请填写商铺简介', trigger: 'change' }
        ],
        slogan: [
          { required: true, message: '请填写商铺标语', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择商铺分类', trigger: 'change' }
        ],
        ship_price: [
          { required: true, message: '请填写配送费', trigger: 'change' }
        ],
        send_price: [
          { required: true, message: '请填写起送价', trigger: 'change' }
        ],
        shop_avatar: [
          { required: true, message: '请上传商铺头像', trigger: 'change' }
        ],
        business_license: [
          { required: true, message: '请上传营业执照', trigger: 'change' }
        ],
        catering_license: [
          { required: true, message: '请上传餐饮许可证', trigger: 'change' }
        ],
        start_time: [
          {
            type: 'date',
            required: true,
            message: '请选择开始营业时间',
            trigger: 'change'
          }
        ],
        end_time: [
          {
            type: 'date',
            required: true,
            message: '请选择结束营业时间',
            trigger: 'change'
          }
        ]
      },
      categoryOptions: [
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange() {},
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  }
}
</script>

<style lang="scss">
.add-merchants-wrapper {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  background-color: white;
}
.w500 {
  width: 500px;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

