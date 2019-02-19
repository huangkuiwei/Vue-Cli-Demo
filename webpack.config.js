const path = require('path');     //引入 node.js -> path包
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';      //定义mode环境

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: './src/main.js'      //入口
  },
  output: {
    filename: devMode ? "[name].js" : '[name].js?[chunkhash:8]'      //出口
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@router': path.resolve(__dirname, 'src/router')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],      //把ES6 ES7等语法转换为ES5
            //动态地加载模块。
            //调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。
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
            name: devMode ? '[name].[ext]' : '[name].[ext]?[hash:8]',
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
      scripts: devMode ? [
        // 引入tinymce.js(免费版)
        '../node_modules/tinymce/tinymce.js'
      ] : [],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        }
      ],
      minify: {
        collapseWhitespace: true,                 //删除空格，压缩html
        removeScriptTypeAttributes: true,         //清除所有script标签中的type="text/javascript"属性
        removeStyleLinkTypeAttributes: true       //清楚所有Link标签上的type属性
      }
    })
  ],
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api': ''}
      }
    }
  }
};