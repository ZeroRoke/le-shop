import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏
    tabs: [{ title: '综合',isActive:true }, { title: '销量',isActive:false }, { title: '价格',isActive:false }],
    goods:[]
  },
  queryInfo: {
    query: '',
    cid: 0,
    pagenum: 1,
    paegsize: 10
  },
  total: 1,//总页码
    // 接收Tabs组件的tabs-item点击事件,改变激活标签栏
  handleItemTap(e) {
    let { index } = e.detail
    let tabs = this.data.tabs
    tabs.forEach((item, i) => {
      if (index === i) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryInfo.cid = options.id || ''
    this.queryInfo.query = options.query || ''
    
    this.getGoods()
  },
  getGoods() {
    request({ url: '/goods/search', data: this.queryInfo})
      .then(res => {
        console.log(res)
        let goods = res.data.message.goods
        this.total = Math.ceil(res.data.message.total / this.queryInfo.paegsize)
        this.setData({
          goods:[...this.data.goods,...goods]
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
    //
    if (this.queryInfo.pagenum >= this.total) {
      wx.showToast({
        title: '没有更多啦',
        icon: 'fail'
      })
    } else {
      this.queryInfo.pagenum++
      this.getGoods()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
