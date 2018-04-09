import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'
import createLogger from 'vuex/dist/logger'
 // 注册插件
Vue.use(Vuex)

// 检测修改state是不是通过mutation去修改的
// npm run build 就是production环境   npm run dev 就是dev环境  所以线下调试时debug为true 
// 上线时要消除严格模式，否则会消耗性能
const debug = process.env.NODE_ENV !=='production' 

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins:debug ? [createLogger()] : []
})