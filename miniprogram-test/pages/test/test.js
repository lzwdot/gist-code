// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toBack() {
    wx.navigateBack({
      delta: 0
    })
  },

  openMap() {
    wx.getLocation({
      success(res) {
        console.log(res),
          wx.chooseLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            success(res) {
              console.log(res)
            }
          })
      }
    })
  },

  getSteps() {
    wx.login({
      success(userInfo) {
        wx.getWeRunData({
          success: (res) => {
            console.log(res)
            wx.request({
              url: 'url',
              data: {
                code: userInfo.code,
                iv: res.iv,
                encryptedData: res.encryptedData
              },
              method: 'POST',
              success(data) {
                console.log(data)
              }
            })
          },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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