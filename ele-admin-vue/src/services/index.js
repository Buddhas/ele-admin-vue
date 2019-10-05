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
  return post('/food/createdFood', params)
}

// 商家列表
const findMerchantsByPage = params => {
  return get('/merchants/findMerchantsByPage', params)
}

// 删除商家 
const deleteMerchants = params => {
  return post('/merchants/deleteMerchants', params)
}

// 获取单个商家
const getMerchantsById = params => {
  return get('/merchants/getMerchantsById', params)
}

// 更新商家
const updateMerchants = params => {
  return post('/merchants/updateMerchants', params)
}
 
// 获取食品列表
const findFoodByPage = params => {
  return get('/food/findFoodByPage', params)
}

// 删除食品 deleteFood
const deleteFood = params => {
  return get('/food/deleteFood', params)
}

// 获取单个食品详情
const getFoodById = params => {
  return get('/food/getFoodById', params)
}

// 更新食品属性
const updatedFood = params => {
  return post('/food/updatedFood', params) 
}

export default {
  login,
  getAllData,
  createMerchants,
  getCategory,
  createFoodCategory,
  getCategoryByPid,
  createdFood,
  findMerchantsByPage,
  deleteMerchants,
  getMerchantsById,
  updateMerchants,
  findFoodByPage,
  deleteFood,
  getFoodById,
  updatedFood
}
