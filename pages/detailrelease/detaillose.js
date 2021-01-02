// pages/detailrelease/detaillose.js
var app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''
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
    // console.log(app.globalData.userinfo._openid)
    this.setData({
      openid: app.globalData.userinfo._openid
    });
    // console.log(this.data.openid)
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

  },

  // db.collection('users').doc(app.globalData.userinfo._id)
  search(){
    console.log(db.collection('0').doc(app.globalData.userinfo._openid)).update({
      data: {
        name: app.globalData.userinfo.name,
      }
    })
  }
})