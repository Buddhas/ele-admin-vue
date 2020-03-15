
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 生成随机字符串(可指定长度)
 * @param len
 * @returns {string}
 */
export const randomString = len => {
  len = len || 8
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * randomWord 产生任意长度随机字母数字组合
 * @param randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 * @param min
 * @param max
 * @returns {string}
 * 调用方法:
 * 生成 3 - 32 位随即字符串
 * randomWord(true,3,32);    例如：olyOXUF5oDsuMmXl3Mi48
 * 生成 32 位随机字符串
 * randomWord(false,32);     例如：fjpnWj29Bb8boiXbLeDF0nxkR4aYcLRl
 */
export const randomWord = (randomFlag, min, max) => {
  let str = ''
  let range = min
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * 获取url后参数
 */
export const GetRequest = () => {
  const url = location.search // 获取url中"?"符后的字串
  const theRequest = {}
  if (url.indexOf('?') != -1) {
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
    }
  }
  return theRequest
}

/**
 * 生成随机颜色值
 */
export const getRandomColor = () => {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

/**
 * 验证身份证号
 * @param el 号码输入input
 * @returns {boolean}
 */
export const checkCardNo = el => {
  const txtval = el.value
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(txtval)
}

/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
export const checkLength = v => {
  let realLength = 0
  const len = v.length
  for (let i = 0; i < len; i++) {
    const charCode = v.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1
    else realLength += 2
  }
  return realLength
}

/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
export const isWeiXin = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

/**
 * 写cookies
 */
export const setCookie = (name, value, time) => {
  // eslint-disable-next-line no-undef
  const strsec = getsec(time)
  const exp = new Date()
  exp.setTime(exp.getTime() + strsec * 1)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

/**
 * 读取cookies
 */
export const getCookie = name => {
  let arr = []
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return arr[2]
  else return null
}

/**
 * 删除cookies
 */
export const delCookie = name => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

/**
 * 浏览器判断
 * 用法示例——多套页面判断是否显示移动端：
 *   let ua = parseUA();
 *   if (!ua.mobile) {
 *       location.href = './pc.html';
 *   }
 */
export const parseUA = () => {
  const u = navigator.userAgent
  const u2 = navigator.userAgent.toLowerCase()
  return {
    // 移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1,
    // IE内核
    presto: u.indexOf('Presto') > -1,
    // opera内核
    webKit: u.indexOf('AppleWebKit') > -1,
    // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
    // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    // android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1,
    // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1,
    // 是否iPad
    webApp: u.indexOf('Safari') == -1,
    // 是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == 'micromessenger',
    ali: u.indexOf('AliApp') > -1
  }
}

/**
 * 生成UUID
 * @returns {string}
 */
export const generateUUID = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid
}

/**
 * 删除左右两端的空格
 * @param str
 * @returns {string | * | void}
 */
// eslint-disable-next-line no-unused-vars
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 删除左边的空格
 * @param str
 * @returns {string | * | void}
 */
// eslint-disable-next-line no-unused-vars
function ltrim(str) {
  return str.replace(/(^\s*)/g, '')
}

/**
 * 删除右边的空格
 * @param str
 * @returns {string | * | void}
 */
// eslint-disable-next-line no-unused-vars
function rtrim(str) {
  return str.replace(/(\s*$)/g, '')
}

/**
 * 对象数组转二维数组
 * @param objArr
 */
// eslint-disable-next-line no-unused-vars
function obj2Arr(objArr) {
  objArr.length > 0 &&
    objArr.map(item => {
      return Object.values(item)
    })
}

/**
 * 找出对象数组中某属性的最大值
 * @param array
 * @param item
 * @returns val
 */
// eslint-disable-next-line no-unused-vars
function maxItemInObjArr(array, item) {
  const max = Math.max.apply(
    Math,
    array.map(function(obj) {
      return obj[item]
    })
  )
  return max
}

/**
 * 判断当前网络环境
 */
export const isWifi = () => {
  try {
    let wifi = true
    const ua = window.navigator.userAgent
    const con = window.navigator.connection
    // 如果是微信
    if (/MicroMessenger/.test(ua)) {
      if (ua.indexOf('WIFI') >= 0) {
        return true
      } else {
        wifi = false
      }
      // 如果支持navigator.connection
    } else if (con) {
      const network = con.type
      if (network !== 'wifi' && network !== '2' && network !== 'unknown') {
        wifi = false
      }
    }
    return wifi
  } catch (e) {
    return false
  }
}

/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
export const fistLetterUpper = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 过滤非法字符串
 */
export const illegalFilter = str => {
  const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im

  if (regEn.test(str) || regCn.test(str)) return false
  return true
}

/**
 * 格式化时间
 */
export const formatDate = date => {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const getDate = date.getDate()
  return `${year}-${month}-${getDate}`
}
