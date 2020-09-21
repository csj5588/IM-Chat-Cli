## IM-CHAT-CLI

---

This is an instant messaging layout scaffold to solve the problem of internal system instant messaging without framework。
(移动端IM（即时通讯）布局脚手架。解决内部及时通讯无框架的问题)


### 使用
安装依赖

```
cnpm install
```
启动项目
```
cnpm run start
```

### 项目结构

<pre style="font-size: 12px">
public                  <span style="color: #007947">// 公共文件 可以放一些第三方字体 样式库等</span>
src
  |-- components        <span style="color: #007947">// 公共组件目录 当业务需要拆分组件的时候，可以在对应的业务文件夹下单独创建一个components文件夹</span>
  |-- models            <span style="color: #007947">// 公共model存放位置</span>
    |-- public.js       <span style="color: #007947">// 公共model文件 可以多个</span>
  |-- pages             <span style="color: #007947">// 容器组件</span>
    |-- .umi            <span style="color: #007947">// umi自动生成配置文件</span>
    |-- view            <span style="color: #007947">// 业务容器 相对路由/demo ***不可以有任何大写字母</span>
      |-- home          <span style="color: #007947">// IM业务</span>
        |-- coms        <span style="color: #007947">// IM业务组件</span>
        |-- modules     <span style="color: #007947">// 业务model目录 model自动加载</span>
        |-- service     <span style="color: #007947">// 业务api目录</span>
        |-- index.js    <span style="color: #007947">// 业务入口 入口文件只识别index.js 后缀必须是js</span>
        |-- index.less  <span style="color: #007947">// 业务样式</span>
    |-- document.ejs    <span style="color: #007947">// html模板</span>
    |-- index.js        <span style="color: #007947">// 入口文件</span>
  |-- services          <span style="color: #007947">// 公共api存放</span>
  |-- themes            <span style="color: #007947">// 公共主题样式</span>
    |-- vars.less       <span style="color: #007947">// 公共变量样式</span>
  |-- utils             <span style="color: #007947">// 工具</span>
    |-- fetch           <span style="color: #007947">// fetch封装</span>
    |-- request         <span style="color: #007947">// 请求方法封装</span>
  |-- global.less       <span style="color: #007947">// 移动端全局样式初始化，样式兼容性处理等</span>
.eslintignore           <span style="color: #007947">// eslint过滤文件清单</span>
.eslintrc.js            <span style="color: #007947">// eslint配置</span>
.gitignore
package.json  
README.md  
</pre>

## 页面布局

![](https://user-gold-cdn.xitu.io/2019/4/19/16a314d86c9c0256?w=764&h=925&f=png&s=37436)

## 效果一览(gif较大)

<table>
    <tr>
        <td>
            <center>
                ![文字布局](https://s1.ax1x.com/2020/09/21/wHuijS.gif)
            </center>
        </td>
        <td>
            <center>
                [键盘布局](https://user-gold-cdn.xitu.io/2019/4/18/16a3123bb988b73f?w=496&h=960&f=gif&s=4605409)
            </center>
        </td>
    </tr>
    <tr>
        <td>
            <center>
                [语音效果](https://user-gold-cdn.xitu.io/2019/4/18/16a3124c6a020762?w=496&h=960&f=gif&s=2531457)
            </center>
        </td>
        <td>
            <center>
                [语音效果](https://user-gold-cdn.xitu.io/2019/4/18/16a3125d932e72d1?w=496&h=960&f=gif&s=2431489)
            </center>
        </td>
    </tr>
    <tr>
        <td>
            <center>
                [操作效果](https://user-gold-cdn.xitu.io/2019/4/18/16a312736b4a4805?w=496&h=960&f=gif&s=5005924)
            </center>
        </td>
        <td>
            <center>
            </center>
        </td>
    </tr>
</table>

## TODO

- [√] 移动端基础架构
- [√] IM-Chat布局
- [√] eslint
- [√] 基础结构
- [√] dav
- [√] umi
- [√] fetch
- [√] mock
- [√] 异常统一处理

## END
  项目将持续稳定更新迭代，欢迎各种issue.

[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=csj5588)](https://github.com/anuraghazra/github-readme-stats)
