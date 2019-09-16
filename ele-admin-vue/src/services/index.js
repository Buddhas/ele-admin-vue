import { get, post } from '../common/request'

const login = params => {
  return post('/admin/login', params)
}

export default {
  login
}
