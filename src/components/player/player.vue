<template>
<div class="player" v-show="playList.length>0">
  <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="iconfont icon-xia"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd" :class="cdCls">
              <img class="image" :src="currentSong.image">
            </div>
          </div>
        </div>
         <!-- 皮肤 -->
        <div class="skin">
          <transition name="slide-fade">
            <div v-show="isShowSkinColors" class="skin-colors">
              <i @click="changeSkinColor('#B72712')" :class="{selected: skinColor==='#B72712'}" class="one"></i>
              <i @click="changeSkinColor('#1565C0')" :class="{selected: skinColor==='#1565C0'}" class="two"></i>
              <i @click="changeSkinColor('#212121')" :class="{selected: skinColor==='#212121'}" class="three"></i>
              <i @click="changeSkinColor('#1B5E20')" :class="{selected: skinColor==='#1B5E20'}" class="four"></i>
            </div>
          </transition>
          <div @click="showSkinColor" :class="{'icon-skin-red': skinColor === '#B72712','icon-skin-blue': skinColor === '#1565C0','icon-skin-black': skinColor === '#212121','icon-skin-green': skinColor === '#1B5E20'}" class="icon-skin"></div> 
        </div>
          <!-- /皮肤 -->
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
          </div>
          <span class="time time-r">{{format(currentSong.duration)}}</span>          
        </div>
        <div class="operators">
          <!-- <div class="icon i-left">
            <i class="icon-sequence"></i>
          </div> -->
          <div class="icon i-left" >
            <i @click="prev" class="iconfont icon-yinpinshangyiquxiayiqu"></i>
          </div>
          <div class="icon i-center" >
            <i @click="togglePlaying" :class="playIcon"></i>
          </div>
          <div class="icon i-right" >
            <i @click="next" class="iconfont icon-yinpinshangyiquxiayiqu-copy"></i>
          </div>
          <!-- <div class="icon i-right">
            <i class="icon icon-not-favorite"></i>
          </div> -->
        </div>
      </div>
  </div>
  <div class="mini-player" :style="{backgroundColor: skinColor}" v-show="!fullScreen" @click="open">
    <div class="icon" >
      <img width="40" height="40" :src="currentSong.image" :class="cdCls" style="padding-bottom: 10px;">
    </div>
    <div class="text">
      <h2 class="name" v-html="currentSong.name"></h2>
      <p class="desc" v-html="currentSong.singer"></p>
    </div>
    <div class="control">
      <i @click.stop="togglePlaying" :class="miniIcon" style="font-size: 40px;"></i>
    </div>
    <!-- <div class="control">
      <i class="icon-playlist"></i>
    </div> -->
  </div>
  <audio ref="audio" :src="currentSong.url" @canplay="ready"  @error="error" @timeupdate="updateTime"></audio>
</div>
  
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import ProgressBar from 'base/progressBar/progressBar.vue'

export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: '',
      isShowSkinColors: false
    }
  },
  components: {
    ProgressBar
  },
  computed:{
    skinColor() {
      return this.$store.state.skinColor;
    },
    cdCls() {
      return this.playing ? 'play' : 'pause'
    },
    disableCls() {
      return this.songReady ? '' : 'disable'
    },
    playIcon() {
      return this.playing ? 'iconfont icon-bofang' : 'iconfont icon-zanting'
    },
    miniIcon() {
      return this.playing ? 'iconfont icon-bofang' : 'iconfont icon-zanting'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters ([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  watch: {
    currentSong() {
      this.$nextTick(()=>{
        this.$refs.audio.play()        
      })
    },
    skinColor(val) {
      localStorage.skinColor = val;
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(()=>{      
        newPlaying? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    // 监听progressBar派发的事件
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      // 点击或滑动 歌曲进度条 歌词滚动到对应的位置
      // if (this.currentLyric) {
      //   this.currentLyric.seek(currentTime * 1000)
      // }
    },
    // 防止快速点击 产生错误
    ready() {
      this.songReady = true
      // this.savePlayHistory(this.currentSong)
    },
    error() {
      this.songReady = true
    },
    back() {
      this.setFullScreen(false)
      this.isShowSkinColors = false
      // console.log(currentSong)
    },
    showSkinColor() {
      this.isShowSkinColors = !this.isShowSkinColors;
    },
    changeSkinColor(color) {
      this.$store.commit('changeSkinColor', color);
      this.isShowSkinColors = false;
    },
    open() {
       this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    prev() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if(index === -1) {
        index = this.playList.length -1
      }
      this.setCurrentIndex(index)
      if(!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false      
    },
    next() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if(index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if(!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 格式化时间
    format(interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
@import "src/common/scss//mixin";

  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: $color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
      }
      .top {
        position: relative;
        margin-bottom: 25px;
        .back{
          position: absolute;
          top: -40px;
          left: 22px;
          z-index: 50;
          .icon-back{
            display: block;
            padding: 9px;
            font-size: $font-size-large-x;
            color: $color-theme;
            transform: rotate(-90deg);
          }
        }
        .title{
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          @include  no-wrap();
          font-size: $font-size-large;
          color: $color-text;
        }
        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
      .middle{
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .skin {
          position: absolute;
          display: flex;
          flex-direction: column;
          bottom: 30px;
          right: 15px;
          width: 30px;
          // height: 100px;
          // background-color: red;
          .skin-colors {
            flex: 4;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .selected {
              border: 1px solid white;
            }
            i {
              flex: 1;
              display: inline-block;
              width: 20px;
              height: 20px;
              cursor: pointer;
              border-radius: 10px;
              margin-bottom: 5px;
            }
            i.one {
              background-color: #B72712;
            }
            i.two {
              background-color: #1565C0;
            }
            i.three {
              background-color: #212121;
            }
            i.four {
              background-color: #1B5E20;
            }
          }
           .icon-skin {
          flex: 1;
          width: 100%;
          height: 30px;
          background-repeat: no-repeat;
          background-size: contain;
          margin-top: 3px;
          cursor: pointer;
        }
        .icon-skin-red {
          background-image: url('./skinRed.svg');
        }
        .icon-skin-green {
          background-image: url('./skinGreen.svg');
        }
        .icon-skin-blue {
          background-image: url('./skinBlue.svg');
        }
        .icon-skin-black {
          background-image: url('./skinBlack.svg');
        }
        }
        .middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper{
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              &.play{
                animation: rotate 25s linear infinite;
              }
              &.pause{
                animation-play-state: paused;
              }
              .image{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
          .playing-lyric-wrapper{
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric{
              height: 20px;
              line-height: 20px;
              font-size: $font-size-medium;
              color: $color-text-l;
            }
          }
        }
        .middle-r{
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper{
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text{
              line-height: 32px;
              color: $color-text-l;
              font-size: $font-size-medium;
              &.current{
                color: $color-text;
              }
            }
          }
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper{
          text-align: center;
          font-size: 0;
          .dot{
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;
            &.active{
              width: 20px;
              border-radius: 5px;
              background: $color-text-ll;
            }
          }
        }
        .progress-wrapper{
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;
          .time{
            color: $color-text;
            font-size: $font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
            &.time-l{
              text-align: left;
            }
            &.time-r{
              text-align: right;
            }
          }
          .progress-bar-wrapper{
            flex: 1;
          }
        }
        .operators{
          display: flex;
          align-items: center;
          .icon{
            flex: 1;
            color: $color-theme;
            &.disable{
              color: $color-theme-d;
            }
            i{
              font-size: 30px;
            }
          }
          .i-left{
            text-align: right;
          }
          .i-center{
            padding: 0 20px;
            text-align: center;
            i{
              font-size: 40px;
            }
          }
          .i-right{
            text-align: left;
          }
          .icon-favorite{
            color: $color-sub-theme;
          }
        }
      }
      &.normal-enter-active, &.normal-leave-active{
        transition: all 0.4s;
        .top, .bottom{
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.normal-enter, &.normal-leave-to{
        opacity: 0;
        .top{
          transform: translate3d(0, -100px, 0);
        }
        .bottom{
          transform: translate3d(0, 100px, 0);
        }
      }
    }
    .mini-player{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background-color: rgb(183, 39, 18);
      color: #fff;
      &.mini-enter-active, &.mini-leave-active{
        transition: all 0.4s;
      }
      &.mini-enter, &.mini-leave-to{
        opacity: 0;
      }
      .icon{
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
        img{
          border-radius: 50%;
          &.play{
            animation: rotate 10s linear infinite;
          }
          &.pause{
            animation-play-state: paused;
          }
        }
      }
      .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: #fff;
        }
        .desc{
          @include no-wrap();
          font-size: $font-size-small;
          color: #fff;
        }
      }
      .control{
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        padding-bottom: 34px;
        padding-right: 30px;
        .icon-play-mini, .icon-pause-mini, .icon-playlist{
          font-size: 30px;
          color: #fff;
        }
        .icon-mini{
          font-size: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  @keyframes rotate{
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg)
    }
  }
  }
</style>
