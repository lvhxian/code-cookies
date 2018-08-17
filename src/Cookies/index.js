/*
* cookies模块
* @author itobys
* */
export default class CodeCookies {
     // 静态属性
     static BASE_COOKIES_KEY = 'code_cookies'; // 公用key值
     static BASE_RUNTIME = `; max-age=7200`; // 公用缓存期限
     static errorMsg = {  // 错误信息模板
        status: 'error',
        msg: 'no msg'
     };
     static successMsg = {  // 成功信息模板
        status: 'success',
        msg: 'success msg'
     };

    /**
     * 获取指定cookies
     * @param {*} keyName => cookies的key值
     */
    static getCookies (keyName) {
        let key = keyName;
        // 检查是否有传入name，如没传入使用实例化名字
        if (key === undefined) {
            key = this.BASE_COOKIES_KEY
        }
        // 返回异步方法
        return new Promise((resolve, reject) => {
            // 先查看是否有cookies值
            if (document.cookie.length > 0) {
                let startNum = document.cookie.indexOf(key + '='); // 开始字符串位置
                // 如果key不为空
                if (startNum !== -1) {
                    startNum = startNum + key.length + 1; // 把开始截取的位置延伸到keyName的=号后面
                    let endNum = document.cookie.indexOf(';', startNum); // 从第一个结尾为;计算长度
                    if (endNum === -1) endNum = document.cookie.length;
                    resolve(document.cookie.substring(startNum, endNum)) // 截取范围在startNum和endNum位置的值
                } else {
                    this.errorMsg.msg = '你的key值不存在或已经过期了';
                    reject(this.errorMsg)
                }
            } else {
                this.errorMsg.msg = '你的cookies列表为空';
                reject(this.errorMsg)
            }
        });
    }
    /**
     * 设置缓存
     * @param {*} keyName => 缓存的key值
     * @param {*} value  => 缓存的value值
     * @param {*} vEnd  => 过期时间设置 支持传入字符串，数字，以及new Date()值
     * @param {*} infinity  => 长期缓存
     */
    static setCookies (keyName, value, vEnd, infinity = false) {
        let Key = keyName || this.BASE_COOKIES_KEY;
        let TimeOut = this.BASE_RUNTIME; // 过期时间 使用默认模板

        // 抛出Promise
        return new Promise((resolve, reject) => {
            if (value === '') {
                this.errorMsg.msg = '传入的value不能为空，必须携带值';
                reject(this.errorMsg)
            }
            // 判断过期时间的传入类型
            switch (vEnd.constructor) {
                // 如过传入为数字
                case Number:
                    TimeOut = Infinity ? `; expires=Fri, 31 Dec 9999 23:59:59 GMT` : `; max-age=${vEnd}`;
                    break;
                // 传入字符串
                case String:
                    TimeOut = `; expires=${TimeOut}`;
                    break;
                // 传入时间
                case Date:
                    TimeOut = `; expires=${vEnd.toUTCString()}`;
                    break;
            }
            // 设置cookies
            document.cookie = `${Key}=${value}${TimeOut}`;

            // 监听是否设置成功
            this.getCookies(Key).then(res => {
                this.successMsg.msg = '设置成功';
                resolve(this.successMsg)
            }).catch(err => {
                this.errorMsg.msg = '设置cookies失败';
                reject(this.errorMsg)
            });
        });
    }
    /**
     * 清除对应的cookies
     * @param {*} name => 缓存的key值
     */
    static cleanCookies (name) {
        return new Promise((resolve, reject) => {
            this.setCookies(name, -1)
                .then(res => {
                    this.successMsg.msg = '删除成功';
                    resolve(this.successMsg)
                })
                .catch(err => {
                    this.errorMsg.msg = '删除失败或值已经不存在';
                    reject(this.errorMsg)
                })
        })
    }
}
