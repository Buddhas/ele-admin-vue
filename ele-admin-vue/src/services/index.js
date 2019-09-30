import { get, post } from '../common/request'

// 登录
const login = params => {
  return post('/admin/login', params)
}

// 获取数据总览
const getAllData = params => {
  return get('/admin/totalData', params)
}

// 创建商户
const createMerchants = params => {
  return post('/merchants/createMerchants', params)
}

// 获取分类
const getCategory = params => {
  return get('/admin/getShopCategory', params)
}

// 创建食品分类
const createFoodCategory = params => {
  return post('/food/createFoodCategory', params)
}

// 获取食品分类
const getCategoryByPid = params => {
  return get('/food/getCategoryByPid', params)
}

// 新增食品
const createdFood = params => {
  console.log('!!!!!!!!')
  console.log(params)
  return post('/food/createdFood', params)
}
export default {
  login,
  getAllData,
  createMerchants,
  getCategory,
  createFoodCategory,
  getCategoryByPid,
  createdFood
}
