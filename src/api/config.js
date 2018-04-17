export const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }
  
  export const options = { // 为了和QQ的接口保持一致
    param: 'jsonpCallback',
    // prefix: 'tan' // 这里是
  }
  
  // 基于jsonp方库，设置自定义的cbname
  // 解决cbname未定义的问题
//   export const options1 = {
//     param: 'jsonpCallback',
//     prefix: 'playlistinfoCallback'
//   }

// 所有的接口正确返回值，都有一个code=0,配置一个常量，语义化更强
  export const ERR_OK = 0
  