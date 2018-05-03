<<template>
  <div id="m-header">
    <span class="PersonCenter" >
      <i class="iconfont icon-gerenzhongxinkaobei" style="font-size：25px;" @click="showAsideMenu(true)"></i>
    </span>
    <h1 class="title">new music</h1>
    <span class="search">
      <router-link tag="div" class="tab-item" to="/search">
        <i class="iconfont icon-sousuo" style="font-size: 0.3rem;"></i>
      </router-link>
    </span>
  </div>
</template>
<script>
export default {
  methods: {
    showAsideMenu(flag) {
      this.$store.commit('showAsideMenu', flag);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variable";
#m-header {
  position: relative;
  height: 0.44rem;
  text-align: center;
  color: #fff;
  font-size: 0rem;
  display: flex;
  justify-content: space-between;
  background-color: rgb(183, 39, 18);
  .title {
    display: inline-block;
    vertical-align: top;
    line-height: 0.44rem;
    font-size: $font-size-large-x;
  }
  .PersonCenter{
    font-size: $font-size-large-x;  
    // font-size: 0.4rem;
    padding-left:10px;
    padding-top:10px;  
  }
  .search{
    font-size: $font-size-large-x;  
    font-size: 0.3rem;
    padding-right:10px;
    padding-top:10px;      
  }
}
</style>

