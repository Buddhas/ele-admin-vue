<template>
  <div class="setting-wrapper">
    <p class="title">管理员信息</p>
    <div class="user-info-wrapper">
      <p class="info-item">
        <span class="info-label">姓名:</span>
        <span class="info-value">{{ userInfo.user_name }}</span>
      </p>
      <p class="info-item">
        <span class="info-label">注册时间:</span>
        <span class="info-value">{{ userInfo.registe_time }}</span>
      </p>
      <p class="info-item">
        <span class="info-label">管理员权限:</span>
        <span v-if="userInfo.permissions === 1" class="info-value">超级管理员</span>
        <span v-else class="info-value">普通管理员</span>
      </p>
      <p class="info-item">
        <span class="info-label">管理员ID:</span>
        <span class="info-value">{{ userInfo.id }}</span>
      </p>
      <p class="info-item">
        <span class="info-label">更换头像:</span>
        <el-upload
          class="avatar-uploader textl"
          action="/api/admin/updateAvatar"
          :show-file-list="false"
          :on-success="updateAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="userInfo.avatar" :src="IMAGESDOMAIN + userInfo.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
    </div>
  </div>
</template>

<script>
import { picService } from 'common/mixins/mixins'
export default {
  mixins: [picService],
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this._getCurrentAdmin()
  },
  methods: {
    _getCurrentAdmin() {
      this.Service.getCurrentAdmin({}).then(res => {
        if (res.status === 200) {
          this.userInfo = res.data
          this.userInfo.registe_time = this.formatTime(
            this.userInfo.registe_time
          )
        } else {
          this.$message.error('获取当前用户信息出错')
        }
      })
    },
    formatTime(time) {
      const date = new Date(time)
      return (
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      )
    },
    updateAvatarSuccess(res) {
      if (res.status === 200) {
        this.userInfo.avatar = res.data.filename
      } else {
        this.$message.error('头像上传失败')
      }
    },
    beforeAvatarUpload(file) {
      return this.checkPic(file, 300)
    }
  }
}
</script>

<style lang="scss">
.setting-wrapper {
  width: 100%;
  height: 100%;
  background-color: white;
}
.title {
  padding: 20px;
  font-size: 24px;
  color: #666;
  text-align: center;
}
.user-info-wrapper {
  width: 40%;
  margin: 20px auto 0;
  min-height: 400px;
  padding: 20px;
  background-color: #f9fafc;
  .info-item {
    display: flex;
    padding: 20px 0;
    font-size: 20px;
  }
}
.info-label {
  width: 110px;
  margin-right: 25px;
  text-align: right;
}
.info-value {
  flex: 1;
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
