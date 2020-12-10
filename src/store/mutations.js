import { ADD_TO_CART, ADD_COUNTER, SET_CART_LIST, CLEAR_CART_LIST } from './types'
import { Toast } from "vant";

export default {
  [ADD_TO_CART](state, data) {
    data.count = 1;
    data.checked = false;
    state.cartList.push(data);
    Toast({
      type: "success",
      message: `加入购物车成功`,
      // 弹框的时候禁止点击
      forbidClick: true,
      duration: 1500
    });
    localStorage.setItem("cartList", JSON.stringify(state.cartList));
  },
   // id相同的时候购物车叠加数量
   [ADD_COUNTER](state, result) {
    result.count++;
    Toast({
      type: "success",
      message: `当前商品数量为${result.count}`,
      // 弹框的时候禁止点击
      forbidClick: true,
      duration: 1500
    });
    localStorage.setItem("cartList", JSON.stringify(state.cartList));
  },

   // 清空购物车
   [CLEAR_CART_LIST](state) {
    // 判断选中哪些数据,过滤没选中的数组返回一个新数组即可
    let result = state.cartList.filter(item => item.checked !== true);
    if (result.length === 0) {
      localStorage.removeItem("cartList");
      state.cartList = [];
    } else {
      state.cartList = result;
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    }
  },

  // 给购物车存储本地的值
  [SET_CART_LIST](state, data) {
    state.cartList = data;
  }
}