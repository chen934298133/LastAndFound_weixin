// pages/detailrelease/detailuserinfo.js
var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber : '',
    weichatNumber : '',
    name : ''
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
    this.setData({
      name: app.globalData.userinfo.name,
      phoneNumber: app.globalData.userinfo.phoneNumber,
      weichatNumber: app.globalData.userinfo.weichatNumber
    })
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

  handlename(ev){
    let value = ev.detail.value;
    console.log(value);
    this.setData({
      name: value,
    })
  },

  handlephone(ev) {
    let value = ev.detail.value;
    console.log(value);
    this.setData({
      phoneNumber: value,
    })
  },

  handleweichat(ev) {
    let value = ev.detail.value;
    console.log(value);
    this.setData({
      weichatNumber: value,
    })
  },

  handleall(){
    this.updateimformation()
  },

  updateimformation(){

    wx.showLoading({
      title: '更新中',
    })
    db.collection('users').doc(app.globalData.userinfo._id).update({
      data : {
        name: this.data.name,
        phoneNumber: this.data.phoneNumber,
        weichatNumber: this.data.weichatNumber,
      }
    }).then((res)=>{
      wx.hideLoading();
      wx.showToast({
        title: '更新成功！',
      })
    })
  }
})