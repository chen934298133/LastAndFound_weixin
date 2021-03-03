const DB = wx.cloud.database().collection("list")
var app = getApp();
// pages/release/release.js
Page({

  addData() {
    // DB.add({
    //   data:{
    //   name: "cjs",
    //   age: 23
    //   },
    //   success(res){
    //     console.log("success",res)
    //   },
    //   fail(res){
    //     console.log("fail", res)
        
    //   }
    // })
  },
  /**
   * 页面的初始数据
   */
  data: {
    logged:"",
    // navList: []
  },

  // getNavList:function(){

  // }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(getApp().globalData.logged);
    this.setData({
      logged: getApp().globalData.logged,
    });
    // console.log(getApp().globalData.userinfo)
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
  // onPullDownRefresh: function () {
  //   // //显示顶部刷新图标
  //   // wx.showNavigationBarLoading();
  //   // //要刷新请求服务器的方法
  //   // this.selectCar();
  //   // //隐藏导航栏加载框
  //   // wx.hideNavigationBarLoading();
  //   // //停止下拉事件
  //   // wx.stopPullDownRefresh();
  //   wx.startPullDownRefresh();
  //   console.log(getApp().globalData.logged);
  //   wx.stopPullDownRefresh();
  // },

  onPullDownRefresh: function () {

    wx.showNavigationBarLoading() //在标题栏中显示加载

    setTimeout(function () {

      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);
    
    this.setData({
      logged: getApp().globalData.logged,
    });
    
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

  login(){
    wx.showToast({
      title: '请先登陆哦！'
    })
  }
})