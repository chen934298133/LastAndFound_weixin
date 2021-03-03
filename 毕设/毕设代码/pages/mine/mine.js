var app = getApp()

const db = wx.cloud.database();
// const card = db.collection("0");
const ele = db.collection("1");
const bag = db.collection("2");
const product = db.collection("3");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    winWidth: 5000,
    winHeight: 5000,
    currentTab: 0,
    product: [],
    datalist: [],
    bag: [],
    current: 'imgurl',
    userinfo: null,
    logged: false
  },


  // getImageList() {
  //   wx.cloud.database().collection('cardlist').get({
  //     success(res) {
  //       // console.log(res)
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(getApp().globalData.userinfo)
    if(!app.globalData.logged){
      wx.showToast({
        title: '请先登陆!',
        icon:'loading',
        duration: 1000
      });
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // console.log(getApp().globalData.userinfo)
    // 获得系统信息
    // wx.getSystemInfo({
    //   success: function(res) {
    //     that.setData({
    //       winWidth: res.windowWidth,
    //       winHeight: res.windowHeight
    //     });
    //   }
    // });

    db.collection("3").orderBy(this.data.current, 'desc').get().then(res => {
      this.setData({
        product: res.data
      })
    });

    db.collection("2").orderBy(this.data.current, 'desc').get().then(res => {
      this.setData({
        bag: res.data
      })
    });

    db.collection("0").orderBy(this.data.current, 'desc').get().then(res => {
      this.setData({
        card: res.data
      });

      db.collection("1").orderBy(this.data.current, 'desc').get().then(res => {
        this.setData({
          ele: res.data
        })
      });
    });
  },

  // getData(){
  //   let that = this
  // }

  //滑动切换
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  //点击tab切换
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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

    this.onLoad();
    this.onReady();

    this.setData({
      logged: getApp().globalData.logged,
    });

  },

})