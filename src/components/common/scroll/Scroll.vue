<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot />
    </div>
  </div>
</template>

<script>
// 导入
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 0和1不监听滚动事件,2监听但是不监听手指松开后的滑动距离,3全部监听
      probeType: this.probeType,
      // 监听是否滚动到底部了
      pullUpLoad: this.pullUpLoad
    })
  // 监听滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('daodole')
        this.$emit("pullingUp")
      })
    }
    // 监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("backTopScroll", position)
      })
    }

  },
  methods: {
    // 保证this.scroll存在才执行
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  // 加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 回到指定的位置
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    }
  }
}
</script>