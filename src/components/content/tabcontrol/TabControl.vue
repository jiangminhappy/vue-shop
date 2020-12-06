<template>
  <div class="tab-control">
    <div 
      v-for="(item, index) in titles" 
      :key="index" 
      :class="{active: index === curIndex}"
      @click="tabControlClick(index)"
      class="tab-control-item"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      curIndex: 0
    }
  },
  methods: {
    tabControlClick(index) {
      this.curIndex = index;
      this.$emit("tabClick", index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  line-height: 42px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  text-align: center;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  font-size: 15px;
  padding: 5px;
}

.active {
  color: #ff5777
}

.active span {
  border-bottom: 2px solid #ff5777;
}
</style>