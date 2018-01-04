import'babel-polyfill' // 解决ie9和一些低版本的高级浏览器对es6新语法并不支持的问题，并能支持ES6所有的新方法
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick' // 点击300毫秒延迟
import '@/common/scss/index.scss'

if (process.env.NODE_ENV === 'production') { // 来判断是不是生产环境？
  fastclick.attach(document.body)
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
