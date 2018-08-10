'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/*
* 缓存插件 - CodeCookies
* @author itobys
*
* */
var CodeCookies = function () {
    /**
     * 实例化
     * @param {*} name => 实例化时传入设置的缓存key名
     * @param {*} time => 实例化时传入设置缓存过期时间
     */
    function CodeCookies() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'code_cookies';
        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7200;
        classCallCheck(this, CodeCookies);

        this.runtime = '; max-age=' + time; // 缓存过期时间
        this.keyName = name; // cookies名字
    }
    /**
     * 获取缓存
     * @param {*} keyName
     */


    createClass(CodeCookies, [{
        key: 'getCookies',
        value: function getCookies(name) {
            var keyName = name;
            // 检查是否有传入name，如没传入使用实例化名字
            if (keyName === undefined) {
                keyName = this.keyName;
            }
            // 先查看是否有cookies值
            if (document.cookie.length > 0) {
                var startNum = document.cookie.indexOf(keyName + '='); // 开始字符串位置
                // 如果key不为空
                if (startNum !== -1) {
                    startNum = startNum + keyName.length + 1; // 把开始截取的位置延伸到keyName的=号后面
                    var endNum = document.cookie.indexOf(';', startNum); // 从第一个结尾为;计算长度
                    if (endNum === -1) endNum = document.cookie.length;
                    // unescape => 对字符串进行解码
                    return unescape(document.cookie.substring(startNum, endNum)); // 截取范围在startNum和endNum位置的值
                }
            }
            return '';
        }
        /**
         * 设置缓存
         * @param {*} keyname => 设置缓存名字
         * @param {*} value  => 需要缓存的值
         * @param {*} infinity  => 长期缓存
         */

    }, {
        key: 'setCookies',
        value: function setCookies(value, vEnd) {
            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }

            var params = args;
            var keyname = this.keyName;
            // 如有传入参数2
            if (vEnd) {
                // 判断当前传入类型
                switch (vEnd.constructor) {
                    // 如过传入为数字
                    case Number:
                        this.runtime = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
                        break;
                    // 传入字符串
                    case String:
                        this.runtime = '; expires=' + vEnd;
                        break;
                    // 传入时间
                    case Date:
                        this.runtime = '; expires=' + vEnd.toUTCString();
                        break;
                }
            }
            // params如有传入CookiesName
            if (params.length > 0 && params[0].CookiesName) {
                keyname = params[0].CookiesName;
            }
            // 设置cookies
            document.cookie = keyname + '=' + value + this.runtime;
        }
        /**
         * 清除对应的cookies
         */

    }, {
        key: 'clearCookies',
        value: function clearCookies(name) {
            this.setCookies('', -1, { CookiesName: name });
        }
    }]);
    return CodeCookies;
}();

/*
* localStorage & sessionStorage
* @params localStorage => 长时间存储在浏览器端
* @params sessionStorage => 浏览器关闭数据清空
* */


var CodeStorage = function () {
    function CodeStorage() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "code_storage";
        classCallCheck(this, CodeStorage);

        this.keyName = name;
    }
    /*
    * 获取session
    * @params name => session的key值
    * @params callback => 使用callback函数获取数据
    * @params local => 切换成localStorage
    * */


    createClass(CodeStorage, [{
        key: 'getSession',
        value: function getSession(name, callback) {
            var local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var keyname = this.keyName; // 默认查询实例化的key
            var result = void 0;
            if (name !== '') {
                keyname = name;
            }
            /*
            * 获取session值 如localStorage是true则使用localStorage
            * */
            if (local) {
                result = localStorage.getItem(keyname);
            } else {
                result = sessionStorage.getItem(keyname);
            }
            // 如传入回调函数
            if (typeof callback === 'function') {
                callback && callback(result);
            } else {
                return result;
            }
        }
        /*
        * 设置session
        * @params name => session的key值
        * */

    }, {
        key: 'setSession',
        value: function setSession(val, name, callback) {
            var local = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var value = val,
                keyname = this.keyName;
            // 判断val是否为对象，则转换json字符串
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
                value = JSON.stringify(value); // 转换数据
            }
            // 如有另外传入key值
            if (name !== '') {
                keyname = name;
            }
            /*
            * 获取session值 如localStorage是true则使用localStorage
            * */
            if (local) {
                localStorage.setItem(keyname, value);
            } else {
                sessionStorage.setItem(keyname, value);
            }
            // callback回调函数
            if (typeof callback === 'function') {
                callback && callback();
            }
        }
        /*
        * 删除session
        * @params name => session的key值
        * */

    }, {
        key: 'delSession',
        value: function delSession(name, callback) {
            var local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var keyname = this.keyName; // 默认删除实例化的name
            if (name !== '') {
                keyname = name;
            }
            /*
            * 获取session值 如localStorage是true则使用localStorage
            * 移除对应的key
            * */
            if (local) {
                localStorage.removeItem(name);
            } else {
                sessionStorage.removeItem(name);
            }
            // 回调函数
            if (typeof callback === 'function') {
                callback && callback();
            }
        }

        /*
        * 清空session
        * @params name => session的key值
        * */

    }, {
        key: 'clearSession',
        value: function clearSession(callback) {

            /*
            * 获取session值 如localStorage是true则使用localStorage
            * 移除对应的key
            * */
            if (local) {
                localStorage.clear();
            } else {
                sessionStorage.clear();
            }
            if (typeof callback === 'function') {
                callback && callback();
            }
        }
    }]);
    return CodeStorage;
}();

/*
* indexedDb api封装
* @params name => 数据库名
* @params version => 数据库版本
* */

var CodeDB = function () {
    function CodeDB() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'code_db';
        var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        classCallCheck(this, CodeDB);

        this.dbName = name || "code_db";
        this.version = version;
        this.isOpenDB = false;
        this.opendb;
        this.idbRequest = "";
    }
    /*
    * 打开indexedDB数据库
    * @params name => 数据表名
    * @params key => 数据表主键
    * @params createStore => 数据库表字段
    * */


    createClass(CodeDB, [{
        key: 'openDb',
        value: function openDb(name) {
            var _this = this;

            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
            var createStore = arguments[2];

            // 阻止数据库多次打开
            if (this.isOpenDB) {
                console.warn("数据库已经开启，切勿频繁打开");
                return;
            }
            // 判断是否第一次触发打开数据库
            if (!this.opendb) {
                this.opendb = indexedDB.open(this.dbName, this.version); // 打开indexed数据库
            }
            // 第一次新建数据库 & 数据库版本发生变化的时候
            this.opendb.onupgradeneeded = function (event) {
                var res = event.target;
                _this.isOpenDB = true; // 设置入口开启
                if (res.readyState === "done") {
                    _this.idbRequest = res.result; // 把数据库资源放入初始化变量中
                    // 判断当前数据库实例是否已经存在当前表，若无则创建表
                    if (!_this.idbRequest.objectStoreNames.contains(name)) {
                        var setStore = _this.idbRequest.createObjectStore(name, { keyPath: key }); // 创建表
                        // 遍历创建字段
                        createStore.forEach(function (item) {
                            setStore.createIndex(item.name, item.name, { unique: item.isUnique });
                        });
                    }
                    console.log("数据库更新成功");
                }
            };

            // 监听是否开启成功
            this.opendb.onsuccess = function (event) {
                var res = event.target;
                _this.isOpenDB = true; // 设置入口开启
                if (res.readyState === "done") {
                    _this.idbRequest = res.result; // 把数据库资源放入初始化变量中
                    console.log("数据库打开成功");
                }
            };

            // 监听开启失败
            this.opendb.onerror = function () {
                console.error("数据库异常，请刷新浏览器重试");
            };
        }

        /*
        * 新增indexedDB 表 数据
        * @params name => 数据表名
        * @params value => 数据源
        * */

    }, {
        key: 'setStore',
        value: function setStore(name, value) {
            // 确保数据库版本一致
            if (this.version === this.idbRequest.version) {
                var request = this.idbRequest.transaction([name], "readwrite").objectStore(name).add(value);

                // 写入成功
                request.onsuccess = function (event) {
                    console.log('写入成功');
                };

                // 写入失败
                request.onerror = function (event) {
                    if (event.isTrusted) {
                        console.error("写入失败: 已经存在数据");
                    } else {
                        throw new Error(event);
                    }
                };
            }
        }

        /*
         * 更新indexedDB 表 数据
         * @params name => 数据表名
         * @params value => 数据源
         * */

    }, {
        key: 'putStore',
        value: function putStore(name, value) {
            // 确保数据库版本一致
            if (this.version === this.idbRequest.version) {
                var request = this.idbRequest.transaction([name], "readwrite").objectStore(name).put(value);

                // 写入成功
                request.onsuccess = function (event) {
                    console.log('更新成功');
                };

                // 写入失败
                request.onerror = function (event) {
                    if (event.isTrusted) {
                        console.error("更新失败: 已经存在数据");
                    } else {
                        throw new Error(event);
                    }
                };
            }
        }

        /*
        * 读取indexedDB 表 指定数据
        * @params name => 数据表名
        * @params key => 主键值
        * */

    }, {
        key: 'getStoreItem',
        value: function getStoreItem(name, key) {
            // 确保数据库版本一致
            if (this.version === this.idbRequest.version) {
                var dataResult = ''; // 接收数据
                var request = this.idbRequest.transaction([name]).objectStore(name).get(key);

                return new Promise(function (resolve, reject) {
                    // 读取成功
                    request.onsuccess = function (event) {
                        console.log('读取成功');
                        dataResult = event.target.result; // 获取数据并且写入变量
                        resolve(dataResult);
                    };

                    // 读取失败
                    request.onerror = function (event) {
                        if (event.isTrusted) {
                            console.error("读取失败: 数据不存在");
                        } else {
                            reject(new Error(event));
                        }
                    };
                });
            }
        }

        /*
         * 删除indexedDB 表 指定数据
         * @params name => 数据表名
         * @params key => 主键值
         * */

    }, {
        key: 'removeStoreItem',
        value: function removeStoreItem(name, key) {
            if (this.version === this.idbRequest.version) {
                var request = this.idbRequest.transaction([name], 'readwrite').objectStore(name).delete(key);

                return new Promise(function (resolve, reject) {
                    // 读取成功
                    request.onsuccess = function (event) {
                        resolve('删除成功');
                    };
                });
            }
        }
    }]);
    return CodeDB;
}();

exports.CodeStorage = CodeStorage;
exports.CodeDB = CodeDB;
exports.default = CodeCookies;
