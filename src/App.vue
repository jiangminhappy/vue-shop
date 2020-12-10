<template>
  <div id="shop-container">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
     <tab-bar />
  </div>
</template>

<script>

import TabBar from "@/components/common/tabbar/TabBar"
export default {
  name: 'App',
  components: {
    TabBar,
  }
}
</script>

<style>
 
</style>
