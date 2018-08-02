/*
* 缓存插件 - CodeCookies
* @author itobys
*
* */
class CodeCookies{
    /**
     * 实例化
     * @param {*} name => 实例化时传入设置的缓存key名
     * @param {*} time => 实例化时传入设置缓存过期时间
     */
    constructor (name = 'code_cookies', time = 7200) {
        this.runtime = `; max-age=${time}` // 缓存过期时间
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
        // 先查看是否有cookies值
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
    setCookies (value, vEnd, ...args) {
        const params = args
        let keyname = this.keyName
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
        // params如有传入CookiesName
        if (params.length > 0 && params[0].CookiesName) {
            keyname = params[0].CookiesName
        }
        // 设置cookies
        document.cookie = `${keyname}=${value}${this.runtime}`
    }
    /**
     * 清除对应的cookies
     */
    clearCookies (name) {
        this.setCookies('', -1, { CookiesName: name })
    }
}

/*
* localStorage & sessionStorage
* @params localStorage => 长时间存储在浏览器端
* @params sessionStorage => 浏览器关闭数据清空
* */
export class CodeStorage {
    constructor(name = "code_storage") {
        this.keyName = name
    }
    /*
    * 获取session
    * @params name => session的key值
    * @params callback => 使用callback函数获取数据
    * */
    getSession (name, callback) {
        let keyname = this.keyName // 默认查询实例化的key
        if (name !== '') {
            keyname = name
        }
        // 获取session值
        const result = sessionStorage.getItem(keyname)
        // 如传入回调函数
        if (typeof callback === 'function') {
            callback && callback(result)
        } else {
            return result
        }
    }
    /*
    * 设置session
    * @params name => session的key值
    * */
    setSession (val, name, callback) {
        let value = val, keyname = this.keyName
        // 判断val是否为对象，则转换json字符串
        if (typeof val === 'object') {
            value = JSON.stringify(value) // 转换数据
        }
        // 如有另外传入key值
        if (name !== '') {
            keyname = name
        }
        // 设置session
        sessionStorage.setItem(keyname, value)
        if (typeof callback === 'function') {
            callback && callback()
        }
    }
    /*
    * 删除session
    * @params name => session的key值
    * */
    delSession (name, callback) {
        let keyname = this.keyName // 默认删除实例化的name
        if (name !== '') {
            keyname = name
        }
        // 移除对应的key
        sessionStorage.removeItem(name)
        if (typeof callback === 'function') {
            callback && callback()
        }
    }

    /*
    * 清空session
    * @params name => session的key值
    * */
    clearSession (callback) {
        sessionStorage.clear()
        if (typeof callback === 'function') {
            callback && callback()
        }
    }

}

export default CodeCookies