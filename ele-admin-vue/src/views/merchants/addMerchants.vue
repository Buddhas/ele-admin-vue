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
        <el-select
          v-model="ruleForm.address"
          filterable
          remote
          reserve-keyword
          placeholder="请输入商铺地址"
          class="w500"
          :remote-method="searchPosition"
          @change="selectAddr"
        >
          <el-option
            v-for="item in searchRes"
            :key="item.id"
            :label="item.district + item.name"
            :value="item.id"
          />
        </el-select>
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
        />
      </el-form-item>
      <el-form-item label="起送价" prop="send_price">
        <el-input-number
          v-model="ruleForm.send_price"
          controls-position="right"
          :min="1"
          :max="20"
        />
      </el-form-item>
      <el-form-item label="满减优惠" prop="full_deduction">
        <span style="padding-right: 5px">满</span>
        <el-input-number
          v-model="ruleForm.full_deduction.top_up"
          controls-position="right"
          :min="1"
          :max="20"
        />
        <span style="padding: 5px">减</span>
        <el-input-number
          v-model="ruleForm.full_deduction.minus"
          controls-position="right"
          :min="1"
          :max="20"
        />
      </el-form-item>
      <el-form-item label="营业时间" prop="business_hours">
        <el-time-select
          v-model="ruleForm.business_hours.start_time"
          class="mr20"
          placeholder="起始时间"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'}"
        />
        <el-time-select
          v-model="ruleForm.business_hours.end_time"
          placeholder="结束时间"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: ruleForm.business_hours.start_time}"
        />
      </el-form-item>
      <el-form-item label="上传商铺头像" prop="shop_avatar">
        <el-upload
          class="avatar-uploader"
          action="/api/merchants/updateShopAvatar"
          :show-file-list="false"
          :multiple="false"
          :on-success="updateAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.shop_avatar" :src="IMAGESDOMAIN + ruleForm.shop_avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传营业执照" prop="business_license">
        <el-upload
          class="avatar-uploader"
          action="/api/merchants/updateBusinessLicense"
          :show-file-list="false"
          :on-success="updateAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.business_license" :src="IMAGESDOMAIN + ruleForm.business_license" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传餐饮许可证" prop="catering_license">
        <el-upload
          class="avatar-uploader"
          action="/api/merchants/updateCateringLicense"
          :show-file-list="false"
          :on-success="updateAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.catering_license" :src="IMAGESDOMAIN + ruleForm.catering_license" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传商家环境" prop="shop_environment">
        <el-upload
          class="avatar-uploader"
          action="/api/merchants/updateShopEnv"
          :show-file-list="false"
          :on-success="updateAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.shop_environment" :src="IMAGESDOMAIN + ruleForm.shop_environment" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ btnText }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { AMapService, picService } from 'common/mixins/mixins'

export default {
  mixins: [AMapService, picService],
  data() {
    const checkoutMobile = (rule, value, callback) => {
      const reg = /0?(13|14|15|17|18|19)[0-9]{9}/
      if (!reg.test(value)) {
        callback(new Error('请填写正确的手机号码'))
      } else {
        callback()
      }
    }
    const checkoutCategory = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请选择商铺分类'))
      } else {
        callback()
      }
    }
    const businessHours = (rule, value, callback) => {
      if (value.start_time.length === 0 || value.end_time.length === 0) {
        callback(new Error('请选择营业时间'))
      } else if (value.start_time > value.end_time) {
        callback(new Error('开始时间必须小于结束时间'))
      } else {
        callback()
      }
    }
    const fullDeduction = (rule, value, callback) => {
      if (value.top_up === 0 || value.minus === 0) {
        callback(new Error('请填写满减额'))
      } else if (value.top_up <= value.minus) {
        callback(new Error('满减额度错误'))
      } else {
        callback()
      }
    }
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
        business_hours: {
          start_time: '',
          end_time: ''
        },
        full_deduction: { // 满减额
          top_up: '',
          minus: ''
        },
        shop_avatar: '',
        shop_environment: '',
        business_license: '',
        catering_license: '',
        longitude: 0,
        latitude: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入商铺名称', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择商铺地址', trigger: 'change' }
        ],
        mobile: [{ validator: checkoutMobile, trigger: 'change' }],
        synopsis: [
          { required: true, message: '请填写商铺简介', trigger: 'change' }
        ],
        slogan: [
          { required: true, message: '请填写商铺标语', trigger: 'change' }
        ],
        category: [{ validator: checkoutCategory, trigger: 'change' }],
        business_hours: [{ validator: businessHours, trigger: 'change' }],
        full_deduction: [{ validator: fullDeduction, trigger: 'change' }],
        ship_price: [
          { required: true, message: '请填写配送费', trigger: 'change' }
        ],
        send_price: [
          { required: true, message: '请填写起送价', trigger: 'change' }
        ],
        shop_avatar: [
          { required: true, message: '请上传商铺头像', trigger: 'change' }
        ],
        shop_environment: [
          { required: true, message: '请上传商家环境图片', trigger: 'change' }
        ],
        business_license: [
          { required: true, message: '请上传营业执照', trigger: 'change' }
        ],
        catering_license: [
          { required: true, message: '请上传餐饮许可证', trigger: 'change' }
        ]
      },
      categoryOptions: [],
      editFlag: false,
      btnText: '立即创建'
    }
  },
  mounted() {
    this.geoLocation()
    this._getCategory().then(() => {
      this.isEdit()
    })
  },
  methods: {
    // 是否编辑
    isEdit() {
      if (this.$route.query.isEdit && this.$route.query.isEdit == '1') {
        this.editFlag = true
        this.btnText = '立即更新'
        this._getMerchantsById()
      }
    },
    // 获取商家详情
    _getMerchantsById() {
      const params = {
        id: this.$route.query.merchantsId
      }
      this.Service.getMerchantsById(params).then(res => {
        if (res.status === 200) {
          const result = res.data
          result.business_hours = {}
          result.full_deduction = {}
          result.category = []
          result.business_hours.start_time = result.start_time
          result.business_hours.end_time = result.end_time
          result.full_deduction.top_up = result.top_up
          result.full_deduction.minus = result.minus
          result.category.push(
            Number(result.first_category),
            Number(result.second_category)
          )
          delete result.start_time
          delete result.end_time
          delete result.first_category
          delete result.second_category
          delete result.top_up
          delete result.minus
          this.ruleForm = result
        }
      })
    },
    // 编辑商铺
    _updateMerchants() {
      this.Service.updateMerchants(this.ruleForm).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.$router.go(-1)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 新增商铺
    _createMerchants(formName) {
      this.Service.createMerchants(this.ruleForm).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.$router.push({ path: '/layout/merchantsList.html' })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.start_time = this.ruleForm.business_hours.start_time
          this.ruleForm.end_time = this.ruleForm.business_hours.end_time
          this.ruleForm.top_up = this.ruleForm.full_deduction.top_up
          this.ruleForm.minus = this.ruleForm.full_deduction.minus
          this.editFlag
            ? this._updateMerchants(formName)
            : this._createMerchants(formName)
        } else {
          return false
        }
      })
    },
    // 获取商家分类
    _getCategory() {
      return this.Service.getCategory().then(res => {
        if (res.status === 200) {
          this.setCategory(res.data, this.categoryOptions)
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 商家分类,递归遍历分类
    setCategory(allCategory, parentCategory) {
      for (const item of allCategory) {
        const params = {}
        params.value = item.id
        params.label = item.name
        if (item.child) {
          params.children = []
          this.setCategory(item.child, params.children)
        }
        parentCategory.push(params)
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      console.log(this.ruleForm, '++++++++++++++')
      this.ruleForm.business_hours = {
        start_time: '',
        end_time: ''
      }
      this.ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
    },
    // 新建商铺
    createMerchants() {},
    handleChange(val) {
      console.log('选中值')
      console.log(val)
    },
    // 上传图片之前做限制
    beforeAvatarUpload(file) {
      return this.checkPic(file, 500)
    },
    // 图片上传成功回调
    updateAvatarSuccess(res) {
      if (res.status === 200) {
        this.ruleForm[res.data.attribute] = res.data.filename
      } else {
        this.$message.error(res.message)
      }
    },
    // 选择商铺地址，设置经纬度
    selectAddr(addId) {
      for (const item of this.searchRes) {
        if (item.id === addId) {
          this.ruleForm.address = item.district + item.name
          this.ruleForm.longitude = item.location.lng
          this.ruleForm.latitude = item.location.lat
          break
        }
      }
    }
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

