import { request } from "../../request/index";

// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetUserInfo(e) {
    console.log(e);
    let { encryptedData, rawData, iv, signature } = e.detail
    
    wx.login({
      success(res) {
        console.log('res',res);
        
        if (res.code) {
          //发起网络请求
          let params = { encryptedData, rawData, iv, signature,code:res.code}
          request({ url: "/users/wxlogin", data: params, method: 'POST' })
            .then(res1 => {
            console.log('res1',res1);
              wx.setStorageSync('token','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
              wx.navigateBack({
                delta: 1
              });
              // wx.navigationTo(
              //   {
              //     url: '/pages/order/index'
              //   }
              // )
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad: function (options) {

  }


  
})
