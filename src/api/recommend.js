import jsonp from 'common/js/jsonp' // 因为导出是defalut,所以这里不用用{}
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)  // 其实返回的是promise对象
}

export function getDiscList() {
  const url = '/api/getDiscList' // 这里是ajax请求了

  const data = Object.assign({}, {
    g_tk: 5381,
    notice: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    needNewCode: 0,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// export function getSongList(disstid) { // 抓取QQ音乐推荐歌单列表
//   const url = '/api/getSongList'

//   const data = Object.assign({}, commonParams, {
//     disstid,
//     type: 1,
//     json: 1,
//     utf8: 1,
//     onlysong: 0,
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }