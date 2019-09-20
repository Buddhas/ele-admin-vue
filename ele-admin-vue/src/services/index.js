import { get, post } from '../common/request'

// 登录
const login = params => {
  return post('/admin/login', params)
}

// 获取数据总览
const getAllData = params => {
  return get('/admin/totalData', params)
}

export default {
  login,
  getAllData
}
