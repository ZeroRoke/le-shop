import { showModal, showToast } from '../../utils/asyncWx'
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {

    },
    cart: [],
    // 总价
    totalPrice: 0,
    // 总商品数量
    totalNum: 0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onShow: function () {
    let cart = wx.getStorageSync("cart") || []
    cart = cart.filter(v=>v.checked)
    this.setData({
      address: wx.getStorageSync('address') || ''
    })
    this.computedTotal(cart)
  }
  ,
  // 计算总价和总数量
  computedTotal(cart) {
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },
  // 商品支付
  async payGoods() {
    let token = wx.getStorageSync('token') || ''
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index"
      })
      return
    }
    // 创建订单
    const header = { Authorization: token }
    let goods = []
    this.data.cart.forEach(v => {
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price:v.goods_price
      })
    })
    const orderInfo = {
      order_price: this.data.totalPrice,
      consignee_addr: this.data.address,
      goods
    }
    const res = await request({ url:'/my/orders/create',data:orderInfo,method:"POST"})
    console.log(res);
    
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: '',
    //   paySign: '',
    //   success: (result)=>{
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  }
})
