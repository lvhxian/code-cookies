/*
* localStorage & sessionStorage
* @params localStorage => 长时间存储在浏览器端
* @params sessionStorage => 浏览器关闭数据清空
* */
export default class CodeStorage {
    static BASE_KEYNAME = "code_storage"; // 公用存储key值
    static errorMsg = {  // 错误信息模板
        status: 'error',
        msg: 'no msg'
    };
    static successMsg = {  // 成功信息模板
        status: 'success',
        msg: 'success msg'
    };
    /*
    * 获取session
    * @params name => session的key值
    * @params local => 切换成localStorage
    * */
    static getSession (name, local = false) {
        let key = name || this.BASE_KEYNAME; // 默认查询实例化的key
        /*
        * 获取session值 如local是true则使用localStorage
        * */
        return new Promise((resolve, reject) => {
            let result = local ? localStorage.getItem(key) : sessionStorage.getItem(key);
            if (result) {
                resolve(result)
            } else {
                this.errorMsg.msg = "数据不存在";
                reject(this.errorMsg)
            }
        })
    }
    /*
    * 设置session
    * @params name => session的key值
    * */
    static setSession (name, val, local = false) {
        let value = val,
            key = name || this.BASE_KEYNAME;
        // 判断val是否为对象，则转换json字符串
        if (typeof val === 'object') {
            value = JSON.stringify(value) // 转换数据
        }
        /*
        * 设置session值 如local是true则使用localStorage
        * */
        // 监听是否设置成功
        return new Promise((resolve, reject) => {
            local ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value);
            // 通过getSession查看是否设置
            this.getSession(key, local)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    this.errorMsg.msg = "设置session失败";
                    reject(this.errorMsg)
                })
        })
    }
    /*
    * 删除指定session
    * @params name => session的key值
    * */
    static delSession (name, local = false) {
        let key = name || this.BASE_KEYNAME; // 默认删除实例化的name
        /*
        * 获取session值 如localStorage是true则使用localStorage
        * 移除对应的key
        * */
        // 回调函数
        return new Promise((resolve, reject) => {
            const result = local ? localStorage.removeItem(key) : sessionStorage.removeItem(key);
            if (result) {
                 this.successMsg.msg = "删除成功";
                 resolve(this.successMsg)
             } else {
                 this.errorMsg.msg = "删除失败";
                 reject(this.errorMsg)
             }
        })
    }

    /*
    * 清空session  如local是true则使用localStorage
    * */
    static cleanSession (local = false) {
        return new Promise((resolve) => {
            const result = local ? localStorage.clear() : sessionStorage.clear()
            if (result) {
                this.successMsg.msg = "清空完毕";
                resolve(this.successMsg)
            }
        });
    }
}