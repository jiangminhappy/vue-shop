import { debounce } from './utils';

export const imgListenerMixin = {
  data() {
    return {
      // 监听图片
      imgListener: null
    };
  },
  mounted() {
    // 给防抖函数赋值一个新的函数
    const refresh = debounce(this.$refs.scroll.refresh, 50);


    // 接收发射的事件总线,并用监听图片变量保存
    this.imgListener = () => {
      refresh();
    };
    this.$bus.$on("imgLoad", this.imgListener)
  }
}

// 回到顶部

export const backToMixin = {
  data() {
    return {
      curPosition: 0,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}