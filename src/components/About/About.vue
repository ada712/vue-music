<template lang="html">
  <transition name="showAbout">

    <div class="about">
      <i @click="showAbout" class="close"></i>
      <div class="about-content">
        <h1>关于</h1>
        <p class="skill"><b>技术栈</b>：</p>
        <div class="font">Vue2<br>Vuex<br>vue-router<br>axios<br>Webpack<br>ES6<br>localStorage(HTML5)<br>CSS3</div>
        <p class="url"><b>源码地址</b>：<b>个人网站</b>：</p>
        <p><br>&nbsp;&nbsp;&nbsp;待业码农，求工作～～如果你觉得该项目不错，还可以请我喝酸奶😄</p>
  
      </div>

      <div @click="showAbout" class="mask"></div>

    </div>
  </transition>

</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      isHover: false
    }
  },
  computed: {
    isShowAbout() {
      return this.$store.state.isShowAbout;
    }
  },
  methods: {
    showAbout() {
      this.$store.commit('showAbout', false);
    }
  }

}
</script>

<style  scoped>
  .showAbout-enter-active {
    transition: all .4s ease-in-out;
  }
  .showAbout-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .showAbout-enter, .showAbout-leave-active {
    transform: rotateZ(180deg);
    opacity: 0;
  }
  a {
    color: #3F51B5;
  }
  .about {
    display: flex;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    
  }
  
  h1 {
    text-align: center;
    font-size: 12px;
    color: #31c27c;
    transition: .3s ease-in-out;
  }
  h1:hover {
    transform: rotate(15deg);
    transition: .3s ease-in-out;
  }

  p {
    text-indent: 25px;
    word-break: break-all;
    margin-top: 0.03rem;
    font-size: 12px;
  }
  b {
    display: inline-block;
    transition: .3s ease-in-out;
  }
  b:hover {
    transform: rotate(-10deg);
    transition: .3s ease-in-out;
  }

      
  p.copyright {
    text-indent: 0;
  }
  .font{
    padding-left: 0.25rem;
  }
  .help {
    padding: 0;
    width: 100%;
  }
  img {
    width: 100%;
    height: auto;
  }
  .mask {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: none;
  }
  
  
</style>
