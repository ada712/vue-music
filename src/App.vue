<template>
  <div id="app">
    <m-header></m-header>
   
    <!-- 侧边栏 -->
    <aside-menu v-show="isShowAsideMenu"></aside-menu>
        
    <tab></tab>
    <!-- 用keep-alive可以把dom缓存到内存中 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <!-- 关于界面 -->
     <!-- <About v-if="isShowAbout"></About> -->
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
import AsideMenu from 'components/AsideMenu/AsideMenu.vue';
import About from 'components/About/About.vue';

export default {
  name: 'app',
  components:{
    MHeader,
    Tab,
    Player,
    AsideMenu,
    About
  },
  computed:{
    //获取是否展示侧边栏
    isShowAsideMenu() {
      return this.$store.state.isShowAsideMenu;
    },
    //获取是否展示关于界面
    isShowAbout() {
      return this.$store.state.isShowAbout;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "common/scss/variable";
#app {
  color: $color-theme;
}
</style>
