// 抓取、获取歌曲来源数据
// import { commonParams} from './config'
import axios from 'axios'

export function getMusic(mid) {
  const url = '/api/music'

  const data = Object.assign({}, {
    // songmid: mid,
    // filename: 'C400' + mid + '.m4a',
    // guid: 7099607575,
    // platform: 'yqq',
    // loginUin: 0,
    // hostUin: 0,
    // needNewCode: 0,
    // g_tk: 91296987,
    // uin: 1152579039,
    // cid: 205361747,
    // format: 'json'
    g_tk: 91296987,
    loginUin: 1152579039,
    hostUin: 0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice: 0,
    platform:'yqq',
    needNewCode:0,
    cid: 205361747,
    uin: 1152579039,
    songmid:mid,
    filename: 'C400' + mid + '.m4a',
    guid: 7099607575
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
