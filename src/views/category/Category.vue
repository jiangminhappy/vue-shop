<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar :slide-bar-list="categoryList" @slideBarItemClick="slideBarItemClick" />
    <scroll class="scroll-height">
      <subcategory :category-list="subcategoryList" />
      <!--  -->
      <tab-control :titles="titleList" @tabClick="tabClick"  ref="tabControl" />
      <goods-list :goods="categoryDetailList" :goods-height="false" />
    </scroll>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll.vue'
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import SlideBar from './childCom/SlideBar'
import Subcategory from './childCom/Subcategory'

import { getCategory, getSubcategory, getCategoryDetail } from '@/network/category'

export default {
  name: 'Category',
  components: {
    NavBar,
    SlideBar,
    Scroll,
    Subcategory,
    TabControl,
    GoodsList
  },
  data() {
    return {
      // 侧栏分页的内容
      categoryList: [],
      // 三类物品的分类
      categoryDetailList: [],
      // 记录当前点击了哪个侧边栏
      currentIndex: 0,
      // 右侧上边的分类
      subcategoryList: [],
      titleList: ["流行", "新款", "精选"],
    }
  },
  methods: {
    // 获取右侧边栏的距离
    getCategoryList() {
      getCategory().then(res => {
        this.categoryList = res.data.category.list
        // 当侧边栏的数据加载完成的时候，加载右侧的数据
        this.$nextTick(() => {
          this.getSubcategory(this.categoryList[0].maitKey)
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
        })
      })
    },
    getSubcategory(key) {
      // 右上侧数据的加载
      getSubcategory(key).then(res => {
        // console.log(res);
        this.subcategoryList = [...res.data.list];
      })
    },
    getCategoryDetail(key, type) {
      // 三分类详情页的加载
      getCategoryDetail(key, type).then(res => {
        this.categoryDetailList = [...res];
      });
    },
    slideBarItemClick({maitKey, index}) {
      // 点击左侧数据的分类分别加载数据
      // 防止重复的请求
      if(this.currentIndex === index) return;
      this.currentIndex = index;
      this.getSubcategory(maitKey);

       // 每次切换分类初始化tabControl的下标
      this.$refs.tabControl.curIndex = 0;
      // 请求对应的推荐列表
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
    },
    tabClick(index) {
      // 切换分类的详情加载数据
       const typeList = ["pop", "new", "sell"];
      // 切换类型数据
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
    }
  },
  created(){
    this.getCategoryList()
  }
}
</script>

<style scoped>
.category-nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.scroll-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
</style>