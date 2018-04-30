<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- 用keep-alive可以把dom缓存到内存中 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

export default {
  name: 'app',
  components:{
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="scss" scoped>
@import "common/scss/variable";
#app {
  color: $color-theme;
}
</style>
