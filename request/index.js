let ajaxTimes = 0
export const request = (params) => {
  ajaxTimes++
  wx.showLoading({
    title:'正在加载中'
  })
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseURL+params.url,
      success: (res) => {
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      },
      complete: () => {
        ajaxTimes--
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}
