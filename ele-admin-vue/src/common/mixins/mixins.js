/*
 * @Descripttion: mixins
 * @version: 1.0
 * @Author: 笑佛弥勒
 * @Date: 2020-03-27 23:04:04
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-29 15:22:25
 */
import GlobalSetting from '../../config/globalSetting'

// 高德地图定位
export const AMapService = {
  data() {
    return {
      mapObj: '',
      longitude: '', // 经度
      latitude: '', // 纬度
      currentCity: '', // 当前城市
      searchRes: [] // 搜索结果
    }
  },
  methods: {
    initAMap() {
      this.mapObj = new AMap.Map('iCenter')
    },
    // 定位
    geoLocation() {
      const that = this
      this.initAMap()
      this.mapObj.plugin('AMap.Geolocation', function() {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 5000, // 超过5秒后停止定位，默认：无穷大
          noIpLocate: 0
        })
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            that.longitude = result.position.lng
            that.latitude = result.position.lat
          } else {
            that.$message.error('定位失败，请刷新浏览器重试')
          }
        })
      })
    },
    // 高德地图搜索服务
    searchPosition(keyword) {
      const that = this
      AMap.plugin('AMap.Autocomplete', function() {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: '全国'
        }
        var autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(keyword, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (status === 'complete' && result.info === 'OK') {
            that.$nextTick(() => {
              that.searchRes = []
              that.searchRes = result.tips
            })
          }
        })
      })
    }
  }
}

// 图片上传校验大小
export const picService = {
  methods: {
    checkPic(file, maxSize) {
      const typeList = ['image/jpeg', 'image/png']
      if (!typeList.includes(file.type)) {
        this.$message.error('仅支持上传jpg和png格式的图片')
        return false
      }
      if (file.size > 1024 * maxSize) {
        // 大小超过500kb
        this.$message.error('图片太大，请重新选择')
        return false
      }
    }
  }
}

export const globalSetting = {
  data() {
    return {
      IMAGESDOMAIN: GlobalSetting.IMAGESDOMAIN
    }
  }
}
