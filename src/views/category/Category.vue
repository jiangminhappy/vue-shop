<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar :slide-bar-list="categoryList" />
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import SlideBar from './childCom/SlideBar'

import { getCategory } from '@/network/category'
export default {
  name: 'Category',
  components: {
    NavBar,
    SlideBar,
  },
  data() {
    return {
      // 分类内容数据
      categoryList: [],
    }
  },
  methods: {
    getCategoryList() {
      getCategory().then(res => {
        // console.log(res)
        this.getCategoryList = res.data.category.list
      })
    }
  },
  mounted(){
    this.getCategoryList()
  }
}
</script>

<style scoped>

</style>