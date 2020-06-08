# 梧桐车服BSS前端工程

该文件为梧桐BSS端前端项目的基础架构和介绍

## 项目架构版本
| Vue | Element-Ui |
| ------ | ------ |
| v2.5.17 | v3.10 |

| Author | E-mail |
| ------ | ------ |
| 乔宇 | 527324363@qq.com |

## 开发

```bash
# 克隆项目
git clone http://39.105.102.15:8888/firmiana/firmiana_frontend.git

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 打包
npm run dist / yarn run dist
```

## 目录

```bash
├── build                      // 构建相关
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filters                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                  // views 所有页面
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口文件 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── .travis.yml                // 自动化CI配置
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
```

## 其它
  
```bash
# --report to build with bundle size analytics
npm run build:prod

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix

#版本号控制
--version change in $store.getters.version from 'src/store/moudules/app.js'
```
  
## D2环境
[D2环境](http://firmiana_frontend.api.d2.yn.cn)

## M1环境
[M1环境](http://firmiana-bss.m1.yunniao.cn)

## 代码规范

```bash
1.文字按功能命名（v1.12.2 later）：

- 注：main（正文用字）；assist（辅助用字）；stress（强调用字）；title（标题用字）；xtitle（大一号标题用字）

- 文字使用场所                命名
- 正文使用                 F_font_main
- 辅助用字                 F_font_assist

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

2.views中命名文件名规则：

- 第一个单词小写，第二个单词首字母大写

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

3.router命名极配置：

- 路径配置全部在src/router/roles.js内
- 命名时单词首字母大写
- path格式为小写，单词中间使用-连接
- name和components、view中模块name一致
- hidden为是否展示在菜单栏中（例：子页面为hidden: true）
- apiUrl为对应页面的router-roles权限

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

4.component格式规范:

- 命名时单词首字母大写
- 文件夹名称为模块Name
- 文件夹内统一为index.vue，通过文件夹名指向

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

5.代码规范：

- 文件内分为template、script、style

- Template:
- 首行缩进为0，代码上下缩进为2个空格
- 判断及循环置前，紧跟动态属性，顺序已在esLint中配置，如果顺序问题错误，terminal中会体现

- Script:
- 冒号：后面要保留一个空格
- 等号= 前后要保留一个空格
- 括号() 后面如有{} 要保留一个空格
- 逗号， 后面要保留一个空格
- js中换行最好统一都加分号；
- js中条件项需要引号时，首选单引号
- script中先import、再export default
- function中then和catch中都需将error展示；example:this.$message.error(err);

- Style:
- rel="stylesheet" lang="scss"
- 减少scope的使用
- 样式首层class命名与模块Name统一

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

6.directive规范
- 建立自定义名称，单词之间用-分割
- 最好统一使用小写
- 内部建立indexjs和与外层文件夹名称一致的js

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

7.Api规范
- 位置于src/api
- api文件夹根据bss功能类划分，例如线路为carline-api、标书为tender-api
- 命名api.js时用小写，后加-api
- 先import request from '@/utils/request' 再export
- function名称单词首字母大写
- get请求时params: data
- post请求时去掉params,仅保留data

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

## License

Copyright (c) 2018-present qiaoyu
