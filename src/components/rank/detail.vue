<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="true"></music-list>
  </transition>
</template>
<script>
  import MusicList from 'components/musicList/musicList'
  import { mapGetters } from 'vuex'
  import { getTopListDetail } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import {getMusic} from 'api/song.js'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    components: {
      MusicList
    },
    computed: {
      ...mapGetters([
        'topList'
      ]),
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      }
    },
    created() {
      this._getTopListDetail()
    },
    methods: {
      _getTopListDetail() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getTopListDetail(this.topList.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeList(res.songlist)
            // console.log("排行榜详细列表",this.songs)
          }
        })
      },
      _normalizeList(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
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
          }
        })
        return ret
      }
    }
  }
</script>
<style lang="scss" scoped>

  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>