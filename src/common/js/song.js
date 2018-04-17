

// 类的拓展性比对象好很多，面向对象，把代码集中到一个地方去维护，，做播放器的时候能够强烈感受到这一点
export default class Song {
constructor({ id, mid, singer, name, album, duration, image, url }) {
  this.id = id
  this.mid = mid
  this.singer = singer
  this.name = name
  this.album = album
  this.duration = duration
  this.image = image
  this.url = url
  }
}
// 工厂模式
export function createSong(musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // 歌源url
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a？vkey=${songVkey}&guid=7099607575&uin=1152579039&fromtag=66`
  })
}
function filterSinger(singer) {
  let ret = []
  if (!singer) return ''
  singer.forEach((item, index) => {
    ret.push(item.name)
  })
  return ret.join('/')
}