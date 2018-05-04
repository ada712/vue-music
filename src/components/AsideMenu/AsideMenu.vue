<template >
  <transition name="fadeIn"><!-- vue.js过渡效果 -->
    <div  class="aside-menu">
      <!-- 收回侧栏的←箭头 -->
      <i class="iconfont icon-fanhui back" @click="showAsideMenu" ></i>
      
      <div class="aside">
        <div :style="{backgroundColor: skinColor}" class="info">
          <a  class="avatar"><img src="../../../static/photo.jpg" alt=""></a>
          <div class="about">
            <span class="name">huihui</span>
            <span class="level">Lv100</span>
            <span @click="isSignIn=true" class="sign">
              {{isSignIn ? '已签到' : '签到'}}
            </span>
          </div>
        </div>

        <div class="settings">
          <div class="content">
            <ul>
              <li><i class="icon-msg"></i>我的消息</li>
              <li><i class="icon-vip"></i>会员中心</li>
              <li><i class="icon-shop"></i>商城</li>
              <li><i class="icon-music"></i>在线听歌免流量</li>
            </ul>
            <ul>
              <li><i class="icon-friend"></i>我的好友</li>
              <li><i class="icon-near"></i>附近的人</li>
            </ul>
            <ul>
            <!-- 阻止默认行为 -->
              <li @click="open"><i class="icon-skin"></i>个性换肤</li>
              <li @click="showAbout"><i class="aboutme"></i>关于</li>
            </ul>
            <div class="back">
              <i @click.stop.prevent="showAsideMenu" class="icon-back"></i>
            </div>
          </div>

        </div>
      </div>

      <!-- 点击此区域showAsideMenu变false -->
      <div @click.stop.prevent="showAsideMenu" class="mask"></div>


    </div>
  </transition>

</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
  name: 'AsideMenu',
  computed: {
    skinColor() {
      return this.$store.state.skinColor;
    }
  },
  data() {
    return {
      isSignIn: false
    }
  },
  methods: {
    //点击←则触发此事件，修改showAsideMenu为false
    showAsideMenu() {
      this.$store.commit('showAsideMenu', false);
    },
    //点击关于，展示关于的界面
    showAbout() {
      this.$store.commit('showAbout', true);
      this.showAsideMenu()      
    },
    open() {
       this.setFullScreen(true)
       this.showAsideMenu()
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    }),
  }
}
</script>

<style  scoped>

.fadeIn-enter-active {
  transition: all .4s ease;
}
.fadeIn-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fadeIn-enter, .fadeIn-leave-active {
  transform: translateX(-12.5rem);
  opacity: 0;
}
.aside-menu {
  width: 100%;
  /*height: 100%;*/
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;/*弹性布局*/
  z-index: 1000;
}
.back {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 0.4rem;
    width: 2rem;
    height: 1rem;
    font-size: 25px;
    font-weight: 1000;
    background-size: contain;
    color: white;
}
.aside {
  flex: 6;
}
.mask {
  flex: 4;
}
.info {
  padding-top: 0.1rem;
  padding-left: 0.05rem;
  padding-bottom: 0.04rem;
  background-color: #B72712;
  box-shadow: 0.01rem 0 0.05rem gray;/*阴影*/
  flex: 1;
}    
a{
  text-decoration: none;
}
a.avatar:hover::after {
  transform: scaleX(0);
}
a::after {
  background-color: white;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.about {
  position: relative;
  margin-top: -50px;
}
span.name {
  color: rgba(255, 255, 255, .8);
  font-size: 25px;
}
span.level {
  width: 20px;
  height:20px;
  border: 1px solid white;
  border-radius: 0.1rem;
  padding:1px 5px;
  color: white;
  font-size: 12px;
  font-style: italic;
  margin-left: -20px;
}
span.sign {
    position: absolute;
    border: 2px solid white;
    text-align: center;
    border-radius: 0.05rem;
    right: 0.1rem;
    color: white;
    height: 20px;
    line-height: 20px;
    top: 0.6rem;
    font-size: 18px;
    width: 60px;
    cursor: pointer;
}

.settings {
  flex: 3.2;
  padding-top: 0.05rem;
  position: relative;
  height: 100%;
  background: white;
  border-right: 0.05rem solid gray;
  box-shadow: 0.1rem 0 1rem gray;
}
.content {
  height: 100%;
}

ul:nth-of-type(1) {
  color: rgba(0, 0, 0, .5);
 /* padding-top: 20px;*/
  border-bottom: 0.05rem solid rgba(0, 0, 0, .04);
}
ul:nth-of-type(2) {
  color: rgba(0, 0, 0, .5);
  border-bottom: 0.05rem solid rgba(0, 0, 0, .04);
}
ul:nth-of-type(3) {
}
ul {
  list-style: none;
  padding: 10px 10px;
}
li {
  font-size: 18px;
  margin-bottom: 10px;
  cursor: pointer;
}
i {
  display: inline-block;
  width: 33px;
  height: 20px;
  vertical-align: text-bottom;/*把元素的底端与父元素字体的底端对齐。*/
}
i.icon-skin {
  background: url('./skin.svg') no-repeat;
  background-size: contain;

}
i.icon-msg {
  background: url('./msg.svg') no-repeat;
  background-size: contain;
}
i.icon-vip {
  background: url('./vip.svg') no-repeat;
  background-size: contain;
}
i.icon-shop {
  background: url('./shop.svg') no-repeat;
  background-size: contain;
}
i.icon-music {
  background: url('./music.svg') no-repeat;
  background-size: contain;
}
i.icon-friend {
  background: url('./friend.svg') no-repeat;
  background-size: contain;
}
i.icon-near {
  background: url('./near.svg') no-repeat;
  background-size: contain;
}

i.aboutme {
  display: inline-block;
  width: 50px;
  height: 20px;
  background: url('./about.svg') no-repeat;
  background-size: contain;/*把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。*/
}
    
</style>
