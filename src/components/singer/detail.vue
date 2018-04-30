<template>
  <transition name="slide">
      <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {getMusic} from 'api/song.js'
import {createSong} from 'common/js/song'
import MusicList from 'components/musicList/musicList'
export default {
  data() {
    return {
      songs:[]
    }
  },
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer' // 映射 `this.singer` 为 `store.getters.singer`
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      // 刷新当前页回退到singer
      if (!this.singer.id) {
        this.$router.push('/singer')
        // return
      }         
      getSingerDetail(this.singer.id).then(res=>{
        if(res.code === ERR_OK ) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log('歌曲',this.songs)
        }
      })
    },
    // 格式化抓取的数据
    _normalizeSongs(list) {
      let ret = []
      const newSong = ''
      list.forEach((item, index) => {
        let { musicData } = item // 对象  结构赋值
        if (musicData.songid && musicData.albummid) {
          // console.log('准备进入')
          getMusic(musicData.songmid).then((res) => {
            if(res.code === ERR_OK) {
              const svkey = res.data.items
              // // console.log('svkey', svkey)
              const songVkey = svkey[0].vkey
              // // console.log('songVkey', songVkey)
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
            }
          })
          // ret.push(createSong(musicData))
          // ret.push(newSong)          
        }
      })
      return ret
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
.singer-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-background
}
.slide-enter-active, .slide-leave-active {
    transition: all 0.3s  
}

.slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)  
}
</style>


