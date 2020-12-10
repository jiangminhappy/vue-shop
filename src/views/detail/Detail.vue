<template>
  <div class="product-detail">
    <detail-nav-bar ref="detailNavBar" @titleItemClick="titleItemClick" />
    <scroll :probe-type="3" class="scroll-height" ref="scroll">
      <detail-swiper :swiper-list="topImages" class="detail-set-scroll" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shops" />
      <detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad" />
       <detail-param-info :param-info="paramsInfo" class="detail-set-scroll" />
      <detail-comment-info :comment-info="commentInfo" class="detail-set-scroll" />
      <goods-list :goods="recommendList" :is-recommend="true" class="detail-set-scroll" />
    </scroll>

    <!-- 回到顶部 -->
    <transition name="scroll">
      <back-up @click.native="backTop" v-show="curPosition >= 1500"></back-up>
    </transition>

    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'
import BackUp from '@/components/content/backup/BackUp'

import GoodsList from "@/components/content/goods/GoodsList";


import DetailNavBar from './childCom/DetailNavBar'
import DetailSwiper from './childCom/DetailSwiper'
import DetailBaseInfo from './childCom/DetailBaseInfo'
import DetailShopInfo from './childCom/DetailShopInfo'
import DetailImagesInfo from './childCom/DetailImagesInfo'
import DetailParamInfo from './childCom/DetailParamInfo'
import DetailCommentInfo from './childCom/DetailCommentInfo'
import DetailBottomBar from './childCom/DetailBottomBar'

import { getDetail, Goods, Shop, GoodsParams, getRecommend } from '@/network/detail'
import { backToMixin, imgListenerMixin } from "@/common/mixin";

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    BackUp,
    DetailBottomBar,
    GoodsList
  },
  data() {
    return {
      detailId: "",
      topImages: [],
      goods: {},
      shops: {},
      detailsInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendList: []
    }
  },
  mixins: [imgListenerMixin, backToMixin],
  created() {
    // 获取页面传过来的id
    this.detailId = this.$route.params.iid;

    console.log(this.detailId)
    // 发送网咯请求
    this.getDetail();
    this.getRecommend();
  },
  methods: {
    getDetail() {
      getDetail(this.detailId).then(res => {
        const data = res.result;

        // 获取轮播图的数据
        this.topImages = data.itemInfo.topImages

        // 获取商品数据
         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // 获取店铺数据
        this.shops = new Shop(data.shopInfo);

        // 获取下面的图片展示数据
        this.detailsInfo = data.detailInfo;

        // 获取尺寸数据
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});

        // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      })
    },
     // 请求推荐数据
    getRecommend() {
      getRecommend().then(res => {
        console.log(res);
        this.recommendList = res.data.list;
      });
    },
    titleItemClick(index) {
      console.log(index)
      // 根据数组的下标滚动到对应的元素内容
      this.$nextTick(() => {
        let el = document.getElementsByClassName("detail-set-scroll")
        this.$refs.scroll.scrollToElement(el[index], 300)
      })
    },
    // 监听图片加载完成
    imgLoad() {
      this.$refs.scroll.refresh();
      this.getClassList();
    },
     // 获取classList
    getClassList() {
      // Array.from() 将伪数组转换成纯数组
      this.detailClassList = [];
      this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"));
      let maxValue = 10000000;
      this.detailClassList.push({ offsetTop: maxValue });
      console.log('this.detailClassList', this.detailClassList);
    },

    // 添加购物车
    addToCart() {
      // 1.获取需要展示到购物车的商品信息
      const obj = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        id: this.detailId
      };
      
        // 2.将商品数据传到购物车页面
      this.$store.dispatch("setCateGoryData", obj);
    }
  }
}
</script>

<style scoped>
.product-detail {
  width: 100%;
  height: 100vh;
  position: relative;
}

/* BScroll固定高度和区域 */
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  /* width: 100%; */
  background-color: #ffffff;
}

/* vue的淡入淡出动画 */
.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.3s;
}

.scroll-enter,
.scroll-leave-to {
  opacity: 0;
}

.scroll-enter-to,
.scroll-leave {
  opacity: 1;
}
</style>