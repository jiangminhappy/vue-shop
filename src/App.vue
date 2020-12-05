<template>
  <div id="shop-container">
    <router-view />
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
