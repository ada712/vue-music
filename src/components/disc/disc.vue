<template>
  <transition name="slide">44465556
      <music-list :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>
<script>
import MusicList from 'components/musicList/musicList'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend.js'
import {ERR_OK} from 'api/config'

export default {
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc',
    ])
  },
  created() {
    this._getSongList()
  },
  components: {
    MusicList
  },
  methods: {
    _getSongList() {
      console.log('进来啦')
      getSongList(this.disc.dissid).then((res)=>{
        if(res.code === ERR_OK ){
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {  
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%,0,0)
}
</style>
