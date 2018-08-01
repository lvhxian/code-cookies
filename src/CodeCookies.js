
// 缓存插件 - EasyCookies
class EasyCookies {
  /**
   * 实例化
   * @param {*} name => 实例化时传入设置的缓存key名
   * @param {*} time => 实例化时传入设置缓存过期时间
   */
  constructor (name = 'easy_cookies', time = 7200) {
    this.runtime = `; max-age=${time}`  // 缓存过期时间
    this.keyName = name // cookies名字
  }
  /**
   * 获取缓存
   * @param {*} keyName
   */
  getCookies (name) {
    let keyName = name
    // 检查是否有传入name，如没传入使用实例化名字
    if (keyName === undefined) {
      keyName = this.keyName
    }
    // 先查看是否长度足够
    if (document.cookie.length > 0) {
      let startNum = document.cookie.indexOf(keyName + '=') // 开始字符串位置
      // 如果key不为空
      if (startNum !== -1) {
        startNum = startNum + keyName.length + 1 // 把开始截取的位置延伸到keyName的=号后面
        let endNum = document.cookie.indexOf(';', startNum) // 从第一个结尾为;计算长度
        if (endNum === -1) endNum = document.cookie.length
        // unescape => 对字符串进行解码
        return unescape(document.cookie.substring(startNum, endNum)) // 截取范围在startNum和endNum位置的值
      }
    }
    return ''
  }
  /**
   * 设置缓存
   * @param {*} keyname => 设置缓存名字
   * @param {*} value  => 需要缓存的值
   * @param {*} infinity  => 长期缓存
   */
  setCookies (value, vEnd) {
    // 如有传入参数2
    if (vEnd) {
      // 判断当前传入类型
      switch (vEnd.constructor) {
        // 如过传入为数字
        case Number:
          this.runtime = vEnd === Infinity ? `; expires=Fri, 31 Dec 9999 23:59:59 GMT` : `; max-age=${vEnd}`
          break
        // 传入字符串
        case String:
          this.runtime = `; expires=${vEnd}`
          break
        // 传入时间
        case Date:
          this.runtime = `; expires=${vEnd.toUTCString()}`
          break
      }
    }
    // 设置cookies
    document.cookie = `${this.keyName}=${value}${this.runtime}`
  }
  /**
   * 检查cookies是否存在
   * @param {*} keyName => 缓存key值
   */
  hasCookies (keyName) {

  }
  /**
   * 获取全部的cookies
   */
  allCookies () {

  }
}

export default EasyCookies
