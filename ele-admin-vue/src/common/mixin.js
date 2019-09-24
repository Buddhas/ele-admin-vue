export const AMapService = {
  data() {
    return {
      mapObj: '',
      longitude: '', // 经度
      latitude: '' // 纬度
    }
  },
  methods: {
    initAMap() {
      this.mapObj = new AMap.Map('iCenter')
    },
    // 定位
    geoLocation() {
      let that = this
      this.initAMap()
      this.mapObj.plugin('AMap.Geolocation', function() {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 5000, //超过5秒后停止定位，默认：无穷大
          noIpLocate: 0
        })
        geolocation.getCurrentPosition((status,result) => {
          if (status === 'complete') {
            that.longitude = result.position.lng
            that.latitude = result.position.lat
          } else {
            that.$message.error('定位失败，请刷新浏览器重试')
          }
        })
      })
    }
  }
}
