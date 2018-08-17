/*
* indexedDb api封装
* @params name => 数据库名
* @params version => 数据库版本
* */

export default class CodeDB {
    constructor (name = 'code_db', version = 1) {
        this.dbName = name || "code_db";
        this.version = version;
        this.isOpenDB = false; // 是否已经openDb过
        this.opendb = ''; // openDB后暂时保留操作位置
        this.idbRequest = ''; // openDB后数据存储位置
        this.errorMsg = {  // 错误信息模板
            status: 'error',
            msg: 'no msg'
        };
        this.successMsg = {  // 成功信息模板
            status: 'success',
            msg: 'success msg'
        };
    }
    /*
    * 打开indexedDB数据库
    * @params name => 数据表名
    * @params key => 数据表主键
    * @params createStore => 数据库表字段
    * */
    openDb (name, key = "id", createStore) {
        return new Promise((resolve, reject) => {
            // 阻止数据库多次打开
            if (this.isOpenDB) {
                this.errorMsg.msg = '数据库已经开启，切勿频繁打开';
                reject(this.errorMsg)
            }
            // 判断是否第一次触发打开数据库
            if (!this.opendb) {
                this.opendb = indexedDB.open(this.dbName, this.version) // 打开indexed数据库
            }

            // 第一次新建数据库 & 数据库版本发生变化的时候
            this.opendb.onupgradeneeded = (event) => {
                const res = event.target;
                this.isOpenDB = true; // 设置入口开启
                if (res.readyState === "done") {
                    this.idbRequest = res.result; // 把数据库资源放入初始化变量中
                    // 判断当前数据库实例是否已经存在当前表，若无则创建表
                    if (!this.idbRequest.objectStoreNames.contains(name)) {
                        const setStore = this.idbRequest.createObjectStore(name, {keyPath: key}); // 创建表
                        // 遍历创建字段
                        createStore.forEach((item) => {
                            setStore.createIndex(item.name, item.name, {unique : item.isUnique})
                        })
                    }
                    this.successMsg.msg = "数据库更新成功";
                    resolve(this.successMsg)
                }
            };

            // 监听是否开启成功
            this.opendb.onsuccess = (event) => {
                const res = event.target;
                this.isOpenDB = true; // 设置入口开启
                if (res.readyState === "done") {
                    this.idbRequest = res.result; // 把数据库资源放入初始化变量中
                    resolve(this.idbRequest)
                }
            };

            // 监听开启失败
            this.opendb.onerror = () => {
                this.errorMsg.msg = "数据库异常，请刷新浏览器重试";
                reject(this.errorMsg)
            }
        });
    }

    /*
    * 新增indexedDB 表 数据
    * @params name => 数据表名
    * @params value => 数据源
    * */
    setDbItem(name, value) {
        // 确保数据库版本一致
        if (this.version === this.idbRequest.version) {
            const request = this.idbRequest.transaction([name], "readwrite").objectStore(name)
                .add(value);
            return new Promise((resolve, reject) => {
                // 写入成功
                request.onsuccess = (event) => {
                    this.successMsg.msg = "写入成功"
                    resolve(this.successMsg)
                };
                // 写入失败
                request.onerror = (event) => {
                    if (event.isTrusted) {
                        this.errorMsg.msg = "写入失败: 已经存在数据";
                        reject(this.errorMsg);
                    } else {
                        reject(event);
                    }
                }
            })
        }
    }

    /*
     * 更新indexedDB 表 数据
     * @params name => 数据表名
     * @params value => 数据源
     * */
    putDbItem(name, value) {
        // 确保数据库版本一致
        if (this.version === this.idbRequest.version) {
            const request = this.idbRequest.transaction([name], "readwrite").objectStore(name)
                .put(value);
            return new Promise((resolve, reject) => {
                // 更新成功
                request.onsuccess = (event) => {
                    this.successMsg.msg = "更新成功";
                    resolve(this.successMsg)
                };
                // 写入失败
                request.onerror = (event) => {
                    if (event.isTrusted) {
                        this.errorMsg.msg = "更新失败: 数据已经存在";
                        reject(this.errorMsg)
                    } else {
                        reject(event)
                    }
                }
            })
        }
    }

    /*
    * 读取indexedDB 表 指定数据
    * @params name => 数据表名
    * @params key => 主键值
    * */
    getDbItem(name, key) {
        // 确保数据库版本一致
        if (this.version === this.idbRequest.version) {
            let dataResult = ''; // 接收数据
            const request = this.idbRequest.transaction([name]).objectStore(name)
                .get(key);

            return new Promise((resolve, reject) => {
                // 读取成功
                request.onsuccess = (event) => {
                    dataResult = event.target.result; // 获取数据并且写入变量
                    resolve(dataResult)
                };
                // 读取失败
                request.onerror = (event) => {
                    if (event.isTrusted) {
                        reject('数据不存在')
                    } else {
                        reject(event)
                    }
                }
            })
        }
    }

    /*
     * 删除indexedDB 表 指定数据
     * @params name => 数据表名
     * @params key => 主键值
     * */
    delDbItem (name, key) {
        if (this.version === this.idbRequest.version) {
            const request = this.idbRequest.transaction([name], 'readwrite').objectStore(name)
                .delete(key);

            return new Promise((resolve, reject) => {
                // 读取成功
                request.onsuccess = (event) => {
                    this.successMsg.msg = "删除成功";
                    resolve(this.successMsg)
                };
                request.onerror = (event) => {
                    this.errorMsg.msg = "删除失败";
                    reject(this.errorMsg)
                }
            })
        }
    }
}