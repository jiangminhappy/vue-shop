<template>
  <div class="recommand">
    <div class="item" v-for="item in recommend" :key="item.link">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommend: {
      type: Array
    }
  }
}
</script>

<style scoped>
.recommand {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.item {
  flex: 1;
}
.item-img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>