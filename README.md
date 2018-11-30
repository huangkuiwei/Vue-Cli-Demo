# Vue-Cli-Demo
## (一). 什么是webpack？
>打包机

WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
>构建

构建就是把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。
* 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
* 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
* 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
* 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
* 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
* 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
* 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。
## (二). 快速配置
### 1. 核心概念
* Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
* Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
* Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
* Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
* Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
* Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
### 2. webpack的工作流程
* Webpack 启动后会从Entry里配置的Module开始递归解析 Entry 依赖的所有 Module。
* 每找到一个 Module， 就会根据配置的Loader去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。
* 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。
* 最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。
### 3. 配置webpack
##### 1) 初始化npm
```
npm init -y
```
在要进行打包的目录下初始化npm, 在控制台执行以上命令后会生成一个package.json的文件。
##### 2) install
```
npm install webpack webpack-cli -D
```
因为从4.0开始，webpack拆分开两个包分别是webpack和webpack-cli
##### 3) 配置文件webpack.config.js
```
module.exports = {
    entry：          // 配置入口文件的地址
    output：         // 配置出口文件的地址
    module：         // 配置模块,主要用来配置不同文件的加载器
    plugins：        // 配置插件
    devServer：      // 配置开发服务器
}
```
接下来我们就一一介绍一下它们的配置。
## (三)  配置开发服务器
### 1. install
```
npm install webpack-dev-server -D
```
### 2. 配置参数
```
devServer: {
    contentBase: path.resolve(__dirname,'dist'),     // 配置开发服务运行时的文件根目录
    host: 'localhost',                               // 开发服务器监听的主机地址
    compress: true,                                  // 开发服务器是否启动gzip等压缩
    port: 8080                                       // 开发服务器监听的端口
}
```
### 3. 配置启动参数
```
"scripts": {
    "dev": "webpack-dev-server --open --mode development"
}
```
从4.0开始，运行webpack时要加参数 --mode development 或者--mode production,分别对应开发环境和生产环境。
## (四) 配置module
### 1. 什么是loader
module主要用来配置不同文件的加载器。谈到加载就离不开loader,那什么是loader呢？
>loader的概念

通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等。
* test：匹配处理文件的扩展名的正则表达式
* use：loader名称，就是你要使用模块的名称
* include/exclude:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
* query：为loaders提供额外的设置选项
>loader的三种写法

* use
* loader
* use+loader
### 2. 支持加载css文件
##### 1) install
```
npm install style-loader css-loader -D
```
##### 2) 配置加载器
```
module: {
    rules: [
        {
            test: /\.css$/,                                         //要匹配的为文件
            use: ['style-loader', 'css-loader'],                    //要使用的loader
            include: path.resolve(__dirname, 'src'),                //包括的文件夹
            exclude: path.resolve(__dirname, 'node_modules')        //不包括的文件夹
        }
    ]
}
```
注意：加载器的加载顺序为从右至左。即先用css-loader解析然后用style-loader将解析后的css文件添加到Head标签中。
### 3. 支持图片
##### 1) install
```
npm install file-loader url-loader -D
```
##### 2) 配置加载器
```
{
    test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
    use: {
        loader: 'file-loader',
        options: {
            outputPath: 'assets'
        }
    }
}
```
### 4. 转义ES6/ES7/JSX
Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5。
##### 1) install
```
npm install @babel/core @babel/preset-env -D
```
##### 2) 配置加载器
```
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}
```
## 5. 配置plugins
配置插件
### 1. html-webpack-plugin(自动产出html) & html-webpack-template(html模板)
我们希望自动能产出HTML文件，并在里面引入产出后的资源。
##### 1) install
```
npm install html-webpack-plugin html-webpack-template -D
```
##### 2) 配置 
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,                              //true或者body: => body   head: => head   false => 不插入资源
            template: require('html-webpack-template'), //模板
            title: '标题',                              //标题
            filename: 'index.html'                      //生成的文件名
            hash: false,                                //名称是否哈希值
            bodyHtmlSnippet: '<div id="app"></div>',    //将插入到<body>中的一小段 HTML
        })
    ]
}
```
### 2. clean-webpack-plugin(打包前先清空输出目录)
```
const CleanWebpackPlugin = require('clean-webpack-plugin');

plugins: [
    new CleanWebpackPlugin('dist')
]
```
## (五)  resolve解析
### 1. extensions
指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
```
resolve:{
    //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
    extensions: ["",".js",".css",".json"]
}
```
### 2. alias
配置别名可以加快webpack查找模块的速度。
```
resolve: {
    alias: {
         '@': path.resolve(__dirname, 'src'),
         '@images': path.resolve(__dirname, 'src/assets/images'),
         '@components': path.resolve(__dirname, 'src/components'),
         '@data': path.resolve(__dirname, 'src/data'),
         '@views': path.resolve(__dirname, 'src/views')
    }
}
```
