Page({
  // 登录
  handleGetUserInfo(e) {
    let { userInfo } = e.detail
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1
    })
   
  }
})
