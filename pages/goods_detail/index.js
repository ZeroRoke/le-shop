import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  // 预览图片
  handlePreview(e) {
    let urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    let current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  // 加入购物车
  handleAddCart() {
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(v => v.goods_id === this.data.goodsObj.goods_id)
    if (index != -1) {
      // 如果已经有
      cart[index].num++
    } else {
      this.data.goodsObj.num = 1
      this.data.goodsObj.checked = true
      cart.push(this.data.goodsObj)
    }
    wx.showToast({
      title: '加入购物车成功',
      mask:true
    })
    
    wx.setStorageSync('cart',cart)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getGoodsDetail(options.goods_id)
  },
  _getGoodsDetail(id) {
    request({ url: '/goods/detail', data: { goods_id: id } })
      .then(res => {
        let goodsObj = res.data.message
        this.setData({
          goodsObj: {
            goods_id:goodsObj.goods_id,
            goods_name: goodsObj.goods_name,
            pics: goodsObj.pics,
            goods_price: goodsObj.goods_price,
            goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')

          }
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
