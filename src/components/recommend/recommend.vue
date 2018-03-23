<template>
  <div class="recommend">
    <div class="recommend-content">
      <!-- 保证recommendList是有，才进入插槽 -->
      <div class="slider-wrapper" v-if="recommendList.length">
        <slider>
          <div v-for="item in recommendList" :key="item.key">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider.vue'
export default {
  data () {
    return {
      recommendList: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()

  },
  components: {
    Slider
    // Scroll,
    // Loading
  },
  methods:{
    // jsonp
    _getRecommend () {
      getRecommend().then(res => {
        if (res.code === ERR_OK) { // 语义化
          this.recommendList = res.data.slider
          console.log('轮播图数据', this.recommendList)           
        }
      })
    },
    _getDiscList() {
      console.log('进来了哈')
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          console.log('歌单详细列表', this.discList)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
          }    
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
