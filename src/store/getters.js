export default {
  // isLoading: state => state.isLoading
  cartList: state => state.cartList,
  // 把getters传给自己,getters默认在第二个参数
  cartListLength: (state, getters) => getters.cartList.length,
}