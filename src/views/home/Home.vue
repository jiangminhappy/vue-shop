<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      :titles="tabControlTitles"
      @tabClick="tabClick"
      class="home-tab-control"
      ref="tabControl"
      v-show="isShowTab"
    />
    <scroll
      :probe-type="3"
      :pull-up-load="true"
      class="scroll-height"
      @pullingUp="loadMore"
      ref="scroll"
      @backTopScroll="backTopScroll"
    >
      <!-- 滚动 -->
      <swiper :swiper-list="banners" @swiperLoad="swiperLoad" />
      <!-- 推荐数据  -->
      <recommend-view  :recommend="recommend"/>
      <!-- 特色区 -->
      <feature-view />
      <!-- 展示区 --> 
      <tab-control 
        :titles="tabControlTitles" 
        @tabClick="tabClick"  
        class="home-tab-control"
        ref="tabControl2"
      />

      <!-- 商品展示区 -->
      <goods-list :goods="goods[curType].list" />

    </scroll>

    <!-- 回到顶部 -->
    <transition name="scroll">
      <back-up @click.native="backTop" v-show="curPosition >= 1500" />
    </transition>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Swiper from '@/components/common/swiper/Swiper'
import Scroll from '@/components/common/scroll/Scroll'
import TabControl from '@/components/content/tabcontrol/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackUp from '@/components/content/backup/BackUp'


import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoodsData } from '@/network/home'
import { imgListenerMixin, backToMixin } from '@/common/mixin'

export default {
  name: 'Home',
  components: {
    NavBar,
    Swiper,
    Scroll,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackUp,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      tabControlTitles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: []},
        new: { page: 0, list: []},
        sell: { page: 0, list: []}
      },
      curType: "pop",
      // curPosition: 0
      // 当前吸顶的位置
      tabOffsetTop: 0
    }
  },
  mixins: [imgListenerMixin, backToMixin],
  computed: {
    isShowTab() {
      return this.curPosition >= this.tabOffsetTop
    }
  },
  methods: {
    // 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    // 请求商品的数据
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      })
    },
    tabClick(index) {
      if(index === 0) {
        this.curType = "pop"
      }else if (index === 1) {
        this.curType = "new"
      } else if(index === 2) {
        this.curType = "sell"
      }

      // this.$$refs
    },

    // 上拉加载更多
    loadMore() {
      this.getHomeGoodsData(this.curType);
    },

    // 获取tabControl的位置
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - 2;
    },

    // 滚动的位置
    backTopScroll(position) {
      this.curPosition = position ? -position.y : 0
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
     console.log(this.tabOffsetTop)
  },
    // keep-alive状态下进来的时候的生命周期
  activated() {
    // 同时刷新better-scroll防止不能滚动
    this.$refs.scroll.refresh();
  },
  // keep-alive状态下离开的时候的生命周期
  deactivated() {
    // 取消home组件事件总线的监听
    this.$bus.$off("imgLoad", this.imgListener);
  }
}

</script>

<style scoped>
.home {
  position: relative;
  height: 100vh;
}
.home .home-nav {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
  z-index: 10;
}

/* BScroll固定高度和区域 */
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}


/* 导航吸顶 */
.home-tab-control {
  position: relative;
  z-index: 3;
  background-color: white;
}
</style>