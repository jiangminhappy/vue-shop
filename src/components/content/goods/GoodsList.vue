<template>
  <div class="goods-list-box">
    <div class="goods-list">
      <div 
        v-for="(item, index) in goods" 
        :key="index"
        class="goods-list-item"
      >
        <img 
          @load="imgLoad"
          :src="item.show.img" 
          @click="goodItemClick(item)"     
        >
        <div class="goods-info">
          <p>{{ item.title }}</p>
          <span class="price">¥{{ item.price }}</span>
          <span class="collect">{{ item.cfav }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 发送一个事件总线
    // 图片加载完成
    imgLoad() {
      // 发射事件总线
      // console.log(111)
      this.$bus.$emit("imgLoad");
    },
    goodItemClick(item) {
      if(item.iid) {
        console.log('success')
        this.$router.push(`/detail/${item.iid}`);
      } else {
        this.$toast(item.title);
      }
    }
  }
}
</script>

<style scoped>
.goods-list-box {
  width: 100%;
}

.goods-list-box .recommend {
  font-size: 15px;
  margin-top: 10px;
  padding-left: 10px;
}

.goods-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.goods-list-item {
  font-size: 14px;
  position: relative;
  width: 48%;
  padding-bottom: 4px;
}

.goods-list-item img {
  display: block;
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
}

.goods-list-item img.item-height {
  height: 250px;
}

.goods-list-item img.item-height2 {
  height: 180px;
}

.goods-info {
  font-size: 14px;
  overflow: hidden;
  margin-top: 4px;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  margin-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.goods-info .price {
  margin-right: 30px;
  color: #ff5777;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  position: absolute;
  top: 2px;
  left: -16px;
  width: 14px;
  height: 14px;
  content: "";
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>