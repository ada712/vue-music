<template>
  <div class="search-box">
    <!-- <i class="icon-search"></i> -->
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query',(newQuery) => {
        this.$emit('query', newQuery)
      })
    }
  }
</script>

<style lang="scss" scoped>
@import "src/common/scss/variable.scss";

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    .icon-search{
      font-size: 24px;
      color: $color-background;
    }
    .box{
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      outline: none;
      background: rgba(0, 0, 0, 0.001);
      color: $color-text;
      font-size: $font-size-medium;
      &::placeholder{
        color: $color-text-d;
      }
    }
    .icon-dismiss{
      font-size: 16px;
      color: $color-background;
    }
  }
</style>