# 开箱即用 - React前端框架
基于[umi](https://umijs.org/zh/) + [dva](https://dvajs.com/)，可插拔的企业级 react 应用框架。

* umi：以路由为基础的，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。然后配以完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。
* dva：一个基于 redux 和 redux-saga 的数据流方案。
* 本项目是一个完整的demo示例，开箱即用。

----

1. 需要具有router，react，redux等基础。
2. 本项目技术栈相关文档：[react中文网](https://react.docschina.org/)、[umi](https://umijs.org/zh/)、[dva](https://dvajs.com/)、[antd](https://ant.design/index-cn)、[antd-mobile](https://mobile.ant.design/index-cn)。

## 1. 安装和常用命令
### 1.1 安装方法一（新手推荐）
1. 下载该项目到本地 `git clone`

### 1.2 安装方法二
1. 全局安装umi：`npm install -g create-umi`
2. 先创建一个空目录，在目录中运行 `create-umi`
3. 选择 `app`, 然后回车确认

### 1.3 其他命令
1. `npm install`：安装依赖
2. `npm run start`：运行开发环境
3. `npm run build`：打包
4. `npm run test`：测试

## 2. 目录结构
```
.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    └── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── assets/                    // 资源目录
        ├── images                 // 图片资源目录
        └── lib                    // 自定义、第三方资源目录
    ├── models/                    // 全局 model目录，基于dva的redux
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    └── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json                   // npm包配置文件，定义项目的npm脚本，依赖包等信息
```

## 3. 框架配置文件 和 项目UI
1. 可配置项请参考：[配置](https://umijs.org/zh/config/)
2. umi会自带 [antd](https://ant.design/index-cn) 和 [antd-mobile](https://mobile.ant.design/index-cn) UI框架，你可以在配置中选择是否启用。

```javascript
// .umirc.js 配置示例
export default {
  treeShaking: true,
  targets: {
    ie: 10
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true, // 是否启用antd UI
        dva: {
          immre: true
        },
        dynamicImport: true, // 按需加载
        title: 'antd-demo',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//
          ]
        }
      }
    ]
  ]
};
```

## 4. 使用代理，解决开发跨域问题

配置文档：[webpack代理配置文档](https://webpack.js.org/configuration/dev-server/#devserverproxy)

```javascript
// .umirc.js
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
};
```
