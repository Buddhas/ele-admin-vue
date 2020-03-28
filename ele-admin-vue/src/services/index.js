import { get, post } from 'common/js/request'

// 登录
const login = params => {
  return post('/api/admin/login', params)
}

// 获取数据总览
const getAllData = params => {
  return get('/api/admin/totalData', params)
}

// 创建商户
const createMerchants = params => {
  return post('/api/merchants/createMerchants', params)
}

// 获取分类
const getCategory = params => {
  return get('/api/admin/getShopCategory', params)
}

// 创建食品分类
const createFoodCategory = params => {
  return post('/api/food/createFoodCategory', params)
}

// 获取食品分类
const getCategoryByPid = params => {
  return get('/api/food/getCategoryByPid', params)
}

// 新增食品
const createdFood = params => {
  return post('/api/food/createdFood', params)
}

// 商家列表
const getMerchantsByPage = params => {
  return get('/api/merchants/getMerchantsByPage', params)
}

// 删除商家
const deleteMerchants = params => {
  return post('/api/merchants/deleteMerchants', params)
}

// 获取单个商家
const getMerchantsById = params => {
  return get('/api/merchants/getMerchantsById', params)
}

// 更新商家
const updateMerchants = params => {
  return post('/api/merchants/updateMerchants', params)
}

// 获取食品列表
const findFoodByPage = params => {
  return get('/api/food/findFoodByPage', params)
}

// 删除食品
const deleteFood = params => {
  return get('/api/food/deleteFood', params)
}

// 获取单个食品详情
const getFoodById = params => {
  return get('/api/food/getFoodById', params)
}

// 更新食品属性
const updatedFood = params => {
  return post('/api/food/updatedFood', params)
}

// 获取当前用户信息
const getCurrentAdmin = params => {
  return get('/api/admin/getCurrentAdmin', params)
}

// 获取管理员列表
const findAdminByPage = params => {
  return get('/api/admin/findAdminByPage', params)
}

// 获取用户列表
const getUserList = params => {
  return get('/api/user/getUserList', params)
}

// 获取用户列表
const isLogin = params => {
  return get('/api/admin/isLogin', params)
}

// 退出登录
const logOut = params => {
  return post('/api/admin/logOut', params)
}
export default {
  login,
  getAllData,
  createMerchants,
  getCategory,
  createFoodCategory,
  getCategoryByPid,
  createdFood,
  getMerchantsByPage,
  deleteMerchants,
  getMerchantsById,
  updateMerchants,
  findFoodByPage,
  deleteFood,
  getFoodById,
  updatedFood,
  getCurrentAdmin,
  findAdminByPage,
  getUserList,
  isLogin,
  logOut
}
