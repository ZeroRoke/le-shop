import { request } from "../../request/index"

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isFocus: false,
    query:''
  },
  timeId: -1,
  handleInput(e) {
    
    let query = e.detail.value
    this.setData({
      isFocus : true
    })
    if (!query.trim()) {
      this.setData({
        isFocus: false,
        list:[]
      })
      return
    }
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.searchByKeyWord(query)
   },1000)
  },

  async searchByKeyWord(query) {
    let res = await request({ url: '/goods/qsearch', data: { query } })
    const list = res.data.message
    this.setData({
      list
    })
  },
  handleCancel() {
    this.setData({
      list: [],
      isFocus: false,
      query:''
    })
  }
})
