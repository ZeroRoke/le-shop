import { getSetting, openSetting, chooseAddress, showModal,showToast } from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {

    },
    cart: [],
    // 是否全选
    isSelectedAll: false,
    // 总价
    totalPrice: 0,
    // 总商品数量
    totalNum: 0
  },
  // 收货地址
  async handleChooseAddress() {
    let address = ''
    try {
      // 如果允许获取地址
      let res = await getSetting()
      if (res.authSetting['scope.address'] || res.authSetting['scope.address'] === undefined) {
        address = await chooseAddress()
      } else {
        // 如果用户不允许获取地址，引导用户自己打开设置
        let res1 = await openSetting()
        if (res1.authSetting['scope.address'] || res1.authSetting['scope.address'] === undefined) {
          address = await chooseAddress()
        }
      }
    } catch (error) {
      console.log(error)
    }
    wx.setStorageSync('address', address)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onShow: function () {
    let cart = wx.getStorageSync("cart") || []
    this.setData({
      address: wx.getStorageSync('address') || ''
    })
    this.computedTotal(cart)
  }
  ,
  // 商品的单选框
  handleItemChange(e) {
    let goods_id = e.currentTarget.dataset.goodsid
    let cart = this.data.cart
    cart.forEach(v => {
      if (v.goods_id === goods_id) {
        v.checked = !v.checked
      }
    })
    this.computedTotal(cart)
  },
  // 计算总价和总数量
  computedTotal(cart) {
    let totalPrice = 0
    let totalNum = 0
    let isSelectedAll = true
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
      } else {
        isSelectedAll = false
      }
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      isSelectedAll
    })
    wx.setStorageSync('cart', cart)
  },
  SelectedAll() {
    let isSelectedAll = !this.data.isSelectedAll
    let cart = this.data.cart
    cart.forEach(v => {
      v.checked = isSelectedAll
    })
    this.computedTotal(cart)
  },
  async editItemNum(e) {
    let cart = this.data.cart
    const { goodsid, operation } = e.currentTarget.dataset
    let index = cart.findIndex(v => v.goods_id === goodsid)
    if (cart[index].num === 1 && operation === -1) {
      let res = await showModal({ content: '是否删除该商品?' })
      if (res.confirm) {
        cart.splice(index, 1)
      }
    } else {
      cart[index].num += operation
    }
    this.computedTotal(cart)
  },
  async payGoods() {
    let { address, totalNum } = this.data
    if (!address.userName) {
      await showToast({ title: '您还没添加收货地址'})
      return
    }
    if (totalNum === 0) {
      await showToast({ title:'您还没有选购商品'})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})
