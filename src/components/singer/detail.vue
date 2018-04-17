<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {getMusic} from 'api/song.js'
import {createSong} from 'common/js/song'

export default {
  data() {
    return {
      songs:[]
    }
  },
  computed: {
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
        return
      }         
      getSingerDetail(this.singer.id).then(res=>{
        console.log('333')
        if(res.code === ERR_OK ) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log('111',this.songs)
        }
      })
    },
    // 格式化抓取的数据
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item, index) => {
        let { musicData } = item // 对象  结构赋值
        if (musicData.songid && musicData.albummid) {
          console.log('222')
          getMusic(musicData.songmid).then((res) => {
            if(res.code === ERR_OK) {
              const svkey = res.data.items
              const songVkey = svkey[0].songVkey
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
            }
          })
          // ret.push(createSong(musicData))
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


