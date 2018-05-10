'use strict'
// Template version: 1.2.8
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  // dev 开发环境
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    proxyTable: {
      '/api/getDiscLists': { // 使用/api/getDiscLists'来代替下面的target
        // target 代表源地址
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', 
        // bypass代表访问源地址是提前设置的数据
        bypass: function(req, res, proxyTable) {
          req.headers.referer = 'https://c.y.qq.com'; // req这个参数就是请求的信息，可以在这里设置请求头信息
          req.headers.host = 'c.y.qq.com';
        },
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否改变源地址,如果接口跨域，需要进行这个参数配置
        pathRewrite: { // pathRewrite设置一下前缀
          '^/api/getDiscLists': ''
        }
      },
      '/api/music': {
        // target 代表源地址
        target: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg', 
        // bypass代表访问源地址是提前设置的数据
        bypass: function(req, res, proxyTable) {
          req.headers.referer = 'https://c.y.qq.com'; // req这个参数就是请求的信息，可以在这里设置请求头信息
          req.headers.host = 'c.y.qq.com';
          req.params = req.query
        },
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否改变源地址,如果接口跨域，需要进行这个参数配置
        pathRewrite: { // pathRewrite设置一下前缀
          '^/api/music': ''
        }
      },
      '/api/getSongList': {
        // target 代表源地址
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', 
        // bypass代表访问源地址是提前设置的数据
        bypass: function(req, res, proxyTable) {
          req.headers.referer = 'https://c.y.qq.com'; // req这个参数就是请求的信息，可以在这里设置请求头信息
          req.headers.host = 'c.y.qq.com';
          req.params = req.query
        },
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否改变源地址,如果接口跨域，需要进行这个参数配置
        pathRewrite: { // pathRewrite设置一下前缀
          '^/api/getSongList': ''
        }
      }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 2019, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
