// pages/index/index.js
var app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    src: ""
  },

  onLoad: function(options) {
    this.setData({
      name: getApp().globalData.name,
      src: getApp().globalData.src,
    })
  },


  getMyInfo: function(e) {
    // console.log(e.detail.userInfo)
    let info = e.detail.userInfo; /*定义变量 */
    app.globalData.userinfo = e.detail.userInfo;
    app.globalData.name = info.nickName;
    app.globalData.src = info.avatarUrl;
    this.setData({
      name: info.nickName,
      src: info.avatarUrl
    });
    console.log(app.globalData.userinfo)
    
  },
})