// pages/index/index.js
var app = getApp();
const db = wx.cloud.database();
Page({
 

  /**
   * 页面的初始数据
   */
  data: {
    // name: "登陆/注册 >",
    // src: "/images/zi.png"
    name: "",
    src: "",
    logged: "",
    disabled: true
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then((res) => {
      // console.log(res.result.openid);
      db.collection('users').where({
        _openid : res.result.openid
      }).get().then((res)=>{
        //如果没有登陆过则设置disabled为false
        if(res.data.length){
          // console.log(res.data[0]);
          // app.globalData.userinfo = Object.assign(app.globalData.userinfo , res.data[0]);
          app.globalData.userinfo = res.data[0];
          app.globalData.logged = true;
          // console.log(app.globalData.userinfo);

          this.setData({
            src: app.globalData.userinfo.src,
            name: app.globalData.userinfo.name,
            logged: true
          });
          // console.log(getApp().globalData.logged);
          wx.showToast({
            title: '欢迎使用丢丢妹！',
          });
          // wx.switchTab({
          //   url: '/pages/mine/mine',
          // })

        }else{
          this.setData({
            disabled: false
          });
          wx.showToast({
            title: '请先登陆！',
          })
        }
        
        
      });
    });
  },

  //获取用户信息并传入到云数据库中
  getMyInfo:function(e){
    // console.log(e.detail.userInfo)
    let info = e.detail.userInfo;/*定义变量 */
    wx.showToast({
      title: '登陆成功！',
    })
    app.globalData.userinfo = e.detail.userInfo;
    app.globalData.name = info.nickName;
    app.globalData.src = info.avatarUrl;
    app.globalData.logged = true;
    console.log(app.globalData.userinfo);
    //更新信息到数据库中
    db.collection("users").add({
      data: {
        name: info.nickName,
        src: info.avatarUrl,
        weichatNumber: '',
        phoneNumber: '',
        links: 0,
        time : new Date
      },
    }).then((res)=>{
      // console.log(res);
      // 更新全局变量
      db.collection('users').doc(res._id).get().then((res)=>{
        app.globalData.userinfo = Object.assign(app.globalData.userinfo , res.data );
        // console.log(app.globalData.userinfo);

        this.setData({
          name: app.globalData.userinfo.nickName,
          src: app.globalData.userinfo.avatarUrl,
          logged: true
        });
      })
    })
  },

  onLoad: function (options) {
    this.setData({
      name:getApp().globalData.name,
      src: getApp().globalData.src,
    })
  },

  //退出登陆
  back(){
    let info = null;/*定义变量 */
    this.setData({
      name: null,
      src: "/images/zi.png",
      logged: false,
      
    });
    wx.showToast({
      title: '退出成功！',
    })
    
    app.globalData.userinfo = null;
    app.globalData.name = null;
    app.globalData.src = null;
    app.globalData.logged = false;
    // console.log(app.globalData.logged)
  },

/**
 * 页面下拉加载
 * 
 */
 onPullDownRefresh: function () {

    wx.showNavigationBarLoading() //在标题栏中显示加载

    setTimeout(function () {

      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);

    this.setData({
      logged: getApp().globalData.logged,
    });

    this.onReady();

  },

})