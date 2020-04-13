import {request} from '../../request/index'
// pages/shop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList:[],
    // 分类导航
    categories: [],
    // 楼层数据
    floorList:[]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图
    request({url:'/home/swiperdata'})
    .then(res=>{
      let swiperList = res.data.message
     
      this.setData({
        swiperList
      })
    })
    // 获取分类导航
    request({url:'/home/catitems'})
    .then(res=>{
      let categories = res.data.message
      this.setData({
        categories
      })
    })
    // 获取楼层数据
    request({ url: '/home/floordata' })
      .then(res => {
        let floorList = res.data.message
        console.log(floorList);
        floorList.forEach(item => {
          item.product_list.forEach(v => {
            let url = v.navigator_url
            let index = url.lastIndexOf('?')
            v.navigator_url = url.slice(0, index) + '/index?' + url.slice(index + 1)
          })
        })
        this.setData({
          floorList
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
