'use strict';

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

// 缓存插件 - CodeCookies
var CodeCookies = function () {
    /**
     * 实例化
     * @param {*} name => 实例化时传入设置的缓存key名
     * @param {*} time => 实例化时传入设置缓存过期时间
     */
    function CodeCookies() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'easy_cookies';
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
            // 先查看是否长度足够
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

module.exports = CodeCookies;
