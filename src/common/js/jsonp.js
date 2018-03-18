import originJSONP from 'jsonp'
/* 这个是自己定义的一个_jsonp，jsonp的封装 */
/**
 * @param {String} url 
 * @param {Object} data 
 * @param {Object} option 
 * @returns 
 */
export default function jsonp(url,data,option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);  // 把参数拼接到url上
  return new Promise((resolve,reject)=>{  // 成功调用resolve，失败调用reject
    originJSONP(url,option,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
} /* 这里把jsonp封装成了一个promise对象，回调函数中如果成功的话会把数据带回来然后resolve出去 */

function param(data) {
  let url = '';
  for(var k in data){
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';/* 这里的substring保证不会有多余的& */
}