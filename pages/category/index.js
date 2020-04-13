
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单栏
    leftMenuList: [],
    // 右侧商品区
    rightContent: [],
    // 所有分类列表
    cateList: [],
    // 点击菜单栏的索引
    currentIndex: 0,
    scrollTop:0
  },
  MenuItemTap(e) {
    let currentIndex = e.currentTarget.dataset.index
    let rightContent = this.data.cateList[currentIndex].children
    this.setData({
      currentIndex,
      rightContent,
      scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Cate = wx.getStorageSync('cates')
    // 如果有旧数据
    if (Cate) {
      // 旧数据没有过期
      if (Date.now() - Cate.time < 1000 * 5 * 60) {
        let leftMenuList = Cate.data.map(v => v.cat_name)
        let rightContent = Cate.data[0].children
        let cateList = Cate.data
        this.setData({
          leftMenuList,
          rightContent,
          cateList
        })
      } else {
        // 过期 重新请求
        this._getCates()
      }
    } else {
      this._getCates()
    }
    
  },
  _getCates() {
    request({ url: '/categories' })
      .then(res => {
        let leftMenuList = res.data.message.map(v => v.cat_name)
        let rightContent = res.data.message[0].children
        let cateList = res.data.message
        wx.setStorageSync('cates', {
          time: Date.now(),
          data:cateList
        })
        this.setData({
          leftMenuList,
          rightContent,
          cateList
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
