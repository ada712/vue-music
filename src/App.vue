<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- 用keep-alive可以把dom缓存到内存中 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive> 
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'

export default {
  name: 'app',
  components:{
    MHeader,
    Tab
  }
}
</script>

<style lang="scss" scoped>
@import "common/scss/variable";
#app {
  color: $color-theme;
}
</style>
