// pages/detailrelease/detail.js
const db = wx.cloud.database();
const product = db.collection("2");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: [],
    openid: '',
    own: false,
    id: '',
  },

  // product1: res.data,
  // product2: res.data,
  // product3: res.data,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let id = options.id;
    product.doc(id).get().then(res => {
      this.setData({
        product: res.data,
        id: id
        // openid: res.data.openid
      });
      // console.log(this.data.id);
      // console.log(res.data.openid);
      // console.log(app.globalData.userinfo._openid)
      if (res.data.openid == app.globalData.userinfo._openid) {
        this.setData({
          own: true
        });
        // console.log(this.data.own)
      }
    });
    // console.log(this.data.product)


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

  },

  //退出登录
  delect() {
    wx.showLoading({
      title: '招领中',
    })
    db.collection('2').doc(this.data.id).remove().then((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '招领成功！',
      })
    })
  },



  //   handleall() {
  //     this.updateimformation()
  //   },

  //   updateimformation() {

  //     wx.showLoading({
  //       title: '招领中',
  //     })
  //     db.collection('0').doc(this.data.id).remov({
  //      
  //     }).then((res) => {
  //       wx.hideLoading();
  //       wx.showToast({
  //         title: '删除成功！',
  //       })
  //     })
  //   }
})