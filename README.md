## Code-Cookies
:cat:   web端缓存的最新选择   :cat: 
- [x] 集成Cookies、优化Cookies使用
- [x] 集成Session Storage、Local Storage(待开发中)
- [ ] 集成IndexedDB（待开发中）


## 使用说明
拉取项目
```
npm i code-cookies -S
```
导入CodeCookies
```
import CodeCookies from 'code-cookies'
```
实例化CodeCookies 并传入cookies的keyname值与过期时间(默认7200秒)
```
const Cookies = new CodeCookies('token', 7200)
```
设置cookies && 获取cookies && 删除Cookies
```
/* 参数二为过期时间，支持传入时间与数值 */

Cookies.setCookies(123, 7200) /* 实例化keyname作为cookies的key值 */ 

/* cookies: token=123 */

Cookies.getCookies("token") /* 如不传入默认使用实例化keyname */ 

/* 123 */ 

Cookies.clearCookies("token") /* 如不传入默认使用实例化keyname */ 

/* null */ 
```

## SessionStorage使用

导入CodeStorage并实例化CodeStorage
```
import {CodeStorage} from 'code-cookies'

/* CodeStorage实例化只需传入keyname值即可 默认使用code_storage */
const codeStorage = new CodeStorage('code_storage')
```

获取Session
```
/* 传入需要查询的key值，支持callback */
codeStorage.getSession('code_storage', () => {
    ... code
})
```
设置Session (传入对象自动序列化)
```
/* 传入需要设置的val, key值(不传使用默认值)，支持callback */
codeStorage.setSession('123', 'code_storage', () => {
    ... code
})
```
删除Session
```
/* 传入需要删除的key值，支持callback */
codeStorage.delSession('code_storage', () => {
    ... code
})
```
清空Session
```
/* 支持callback */
codeStorage.clearSession(() => {
    ... code
})
```