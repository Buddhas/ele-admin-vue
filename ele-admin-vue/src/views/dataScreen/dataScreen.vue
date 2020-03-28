<template>
  <div class="data-screen-wrapper">
    <p class="title">数据统计</p>
    <div class="data-screen">
      <div class="mb20">
        <el-row>
          <el-col :span="4" class="mr10 current-title">
            <div class="grid-content current-title">当日数据：</div>
          </el-col>
          <el-col :span="4" class="mr10">
            <div class="data-content">{{ totalData.today.admin }}新增用户</div>
          </el-col>
          <el-col :span="4" class="mr10">
            <div class="data-content">{{ totalData.today.order }}新增订单</div>
          </el-col>
          <el-col :span="4" class="mr10">
            <div class="data-content">{{ totalData.today.admin }}新增管理员</div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="4" class="mr10 current-title">
            <div class="grid-content current-title">总数据：</div>
          </el-col>
          <el-col :span="4" class="mr10">
            <div class="data-content">{{ totalData.total.admin }}注册用户</div>
          </el-col>
          <el-col :span="4" class="mr10">
            <div class="data-content">{{ totalData.total.order }}订单</div>
          </el-col>
          <el-col :span="4" class="mr10">
            <div class="data-content">{{ totalData.total.admin }}管理员</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="movements-wrapper">
      <movements :seven-date="sevenData" :seven-day="sevenDay" />
    </div>
  </div>
</template>

<script>
import movements from '../../components/echarts/echarts'
import { formatDate } from 'common/js/util'
export default {
  components: {
    movements
  },
  data() {
    return {
      totalData: {
        today: {
          admin: 0,
          order: 0
        },
        total: {
          admin: 0,
          order: 0
        }
      },
      dateAWeek: {
        adminData: [],
        orderData: []
      },
      sevenData: [[], [], []], // 新注册用户, 新增订单, 新增管理员
      sevenDay: []
    }
  },
  mounted() {
    this.getAllData()
    this.getAWeekDate()
  },
  methods: {
    // 请求数据
    getAllData() {
      this.Service.getAllData().then(res => {
        this.totalData = res.data.currentData
        this.getAWeekData(res.data.dateAWeek)
      })
    },
    // 格式化最近一周的数据
    getAWeekData(allData) {
      for (let i = 6; i >= 0; i--) {
        this.sevenData[0].push(i * 10) // 新增用户
        this.sevenData[1].push(allData.orderData[i])
        this.sevenData[2].push(allData.adminData[i])
      }
    },
    // 格式化最近一周时间
    getAWeekDate() {
      const currentDate = new Date()
      for (let i = 6; i >= 0; --i) {
        this.sevenDay.push(formatDate(currentDate - i * 1000 * 24 * 60 * 60))
      }
    }
  }
}
</script>

<style lang="scss">
.data-screen-wrapper {
  width: 100%;
  height: 100%;
  background-color: white;
  .data-screen {
    padding-left: 20px;
  }
}
.title {
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  color: black;
}
.current-title {
  line-height: 36px;
  text-align: center;
  border-radius: 4px;
  color: white;
  background-color: #ff9800;
}
.data-content {
  line-height: 36px;
  text-align: center;
  border-radius: 4px;
  color: black;
  background-color: #e5e9f2;
}
.movements-wrapper {
  margin-top: 60px;
}
</style>
