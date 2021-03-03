App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      env: 'envtest-ly1qm'
    });

    // this.userInfo = {}
  },

  globalData: {
    name: "登陆/注册 >",
    src: "/images/zi.png",
    userinfo: null,
    logged: false
  },

})
