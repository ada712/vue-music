<template>
  <scroll class="suggest" 
  :data="result"
  :pullUp="pullUp"
  ref="suggest"
  >
  <!-- @scrollToEnd="searchMore" -->
  
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text"  v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <!-- <loading v-show="hasMore" title=""></loading> -->
    </ul>
    <div v-show="!result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
  
</template>
<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {getMusic} from 'api/song.js'
import NoResult from 'base/noResult/noResult'
import { mapMutations, mapActions } from 'vuex'
const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    query: {
      type: String,
      default:''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullUp: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ]),
    refresh() {
      this.$refs.suggest.refresh()
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    // 请求服务端
    search(){
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query,this.page,this.showSinger,perpage).then((res)=>{
        if (res.code === ERR_OK) {
          this.result = this._getResult(res.data)
          // this._checkHasMore(res.data)
        }
      })
    },
    // 判断是否已加载完
    _checkHasMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    _getResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        console.log('这里是点击歌曲',data.song.list)
        ret = this._normalizeSongs(data.song.list)
      }
      console.log('_getResult返回的数据', ret)
      return ret
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          getMusic(musicData.songmid).then((res) => {
            if(res.code === ERR_OK) {
              const svkey = res.data.items
              const songVkey = svkey[0].vkey
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
            }                 
          })
        }
      })
      console.log('ret-final',ret)
      return ret
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    }
    // searchMore() {
    //       console.log(45)      
    //   if (!this.hasMore) return
    //   this.page ++
    //   search(this.query, this.page, this.showSinger, perpage)
    //   .then(res => {
    //     if (res.code === ERR_OK) {
    //       console.log(454545)
    //       this.result = this.result.concat(this._getResult(res.data))
    //       // this._checkHasMore(res.data)
    //     }
    //   })
    // }
  },
  watch: {
    query() {
      this.search()
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
@import "src/common/scss//mixin";

  .suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
      padding: 0 30px;
      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon{
        flex: 0 0 25px;
        width: 30px;
        font-size: 14px;
        color: $color-text-d;
      }
      .name{
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text{
          @include no-wrap();
        }
      }
    }
    .no-result-wrapper{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>