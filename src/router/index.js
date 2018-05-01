import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer/detail'
import Search from 'components/search/search'
import Disc from 'components/disc/disc.vue'
import RankDetail from 'components/rank/detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',  
      redirect: '/recommend' // 重定向，默认进来根路径指向推荐页面

    },
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: Disc
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [{
        path: ':id',
        component: RankDetail
      }]
    },
    {
      path: '/search',
      component: Search
    },
  ]
})
