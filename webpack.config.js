const path = require('path')     // 引入包
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { dependencies } = require('./package')
const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'      //定义全局mode环境

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: './src/main.js'      // 入口
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[chunkhash:8].js'      // 出口
  },
  resolve: {
    alias: {
      '@router': path.resolve(__dirname, 'src/router'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],      // 把ES6 ES7等语法转换为ES5
            // 动态地加载模块。
            // 调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(.jpg | .png | .gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
            outputPath: 'assets'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Hello Vue.js',
      template: require('html-webpack-template'),
      bodyHtmlSnippet: '<div id="app"></div>',
      scripts: devMode ? [] : [
        `//cdn.bootcss.com/vue/${dependencies['vue'].substr(1)}/vue.min.js`,
        `//cdn.bootcss.com/vue-router/${dependencies['vue-router'].substr(1)}/vue-router.min.js`
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        }
      ],
      minify: {
        collapseWhitespace: true,                 // 删除空格，压缩html
        removeScriptTypeAttributes: true,         // 清除所有script标签中的type="text/javascript"属性
        removeStyleLinkTypeAttributes: true       // 清除所有Link标签上的type属性
      }
    }),
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量。
    // 注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。
    // 通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')。
    new webpack.DefinePlugin({
      WEBPACK_MODE: devMode ? '\'development\'' : '\'production\''
    })
  ],
  externals: devMode ? {} : {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  },
  devtool: devMode ? 'eval' : 'source-map',
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 88,
    proxy: {
      '/api': {
        target: process.env.DEV_SERVER || 'http://localhost:8080',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
