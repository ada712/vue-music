<template>
  <div id="tab">
      <!-- tab最终使得router-link渲染出什么样的标签 -->
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
      </router-link>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
#tab {
    display: flex;
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: $font-size-medium;
    .tab-item {
        flex: 1;
        text-align: center;
        .tab-link {
            padding-bottom:0.05rem;
            color: $color-text-l;
        }
        &.router-link-active {
            .tab-link {
                color: pink;
                border-bottom: 2px solid pink;
            }
        }
    }
}
</style>
