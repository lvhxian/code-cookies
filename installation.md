# 安装

## 从NPM上直接安装

```javascript
npm i code-cookies -S
```

## 从仓库直接拉取

#### [https://github.com/iTobys/code-cookies/blob/master/dist/bundle.js](https://github.com/iTobys/code-cookies/blob/master/dist/bundle.js)

## 使用前先导入实例化并且实例化

```javascript
import CodeCookies from 'code-cookies'

/*
* @params1 => cookies默认key, 默认为code_cookies
* @params2 => cookies过期时间, 默认为7200秒
*/
const Cookies = new CodeCookies('token', 7200)
```



