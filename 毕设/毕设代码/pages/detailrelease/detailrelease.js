const db = wx.cloud.database();
const product = db.collection("product");
var app = getApp();
Page({

  data:{
    imgurl:"/images/tu.png",
    name:"",
    describe:"",
    username:"",
    phoneNumber:"",
    weichatNumber:"",
    logged:false,
    openid:"",
    //  array:['校园卡','银行卡','社保卡','医保卡','交通卡','其他卡片'],
    array: ['卡片证件', '电子产品', '包', '其他'],
    objectArray: [
      {
        id: 0,
        name: '卡片证件'
      },
      {
        id: 1,
        name: '电子产品'
      },
      {
        id: 2,
        name: '包'
      },
      {
        id: 3,
        name: '其他'
      }
    ],
    index1: 4,

  },

/**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      username: app.globalData.userinfo.name,
      phoneNumber: app.globalData.userinfo.phoneNumber,
      weichatNumber: app.globalData.userinfo.weichatNumber,
      logged: app.globalData.logged,
      openid: app.globalData.userinfo._openid
      // index1 : 3,
    });
    console.log(this.data)
  },

  //实现下拉选择控件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index1: e.detail.value
    });
    // var id = 3;
    //  id = e.detail.value;
    this.data.currentId = e.detail.value;
 
  },

//添加图片至云存储
  addImgList(imgurl) {
    // console.log("123132",iii)
    // var i = a();
    // console.log(i);
    // var ii = bindPickerChange();
    // let that = this;
    // var ii = that.bindPickerChange();
    let that = this;
    var id = that.data.index1;
    console.log(id)
  //添加信息至云数据库
    wx.cloud.database().collection(id).add({
      data: {
        name: that.data.name,
        describe: that.data.describe,
        // describe: app.globalData.userinfo.name + app.globalData.userinfo.phoneNumber,
        imgurl: imgurl,
        username: that.data.username,
        phoneNumber: that.data.phoneNumber,
        weichatNumber: that.data.weichatNumber,
        openid:that.data.openid
        // username: app.globalData.userinfo.name,
        // phoneNumber: app.globalData.userinfo.phoneNumber,
        // weichatNumber: app.globalData.userinfo.weichatNumber
      },
      success(res) {
        console.log("chenggong1", res)
        // console.log(that.data)
      },
      fail(res) {
        console.log("shibaishangchuan", res)
        console.log(that.data.index1)

      }
    })

  },

  upload(){
    let that = this;
    // console.log("点击了上传！")
  

    // var ii = that.bindPickerChange();
    // console.log("点击了上传11111！"+ ii )
    //调用验证表单方法

    // 获取到  a 方法中的值
    var id = that.data.index1;
    console.log(id);
    console.log(id == 4);

    if(id==4){
      wx.showToast({
        title: '请选择分类',
        icon: 'loading',
        duration: 2000
      });

    }else{
      wx.chooseImage({
        count: 1,
        success: chooseResult => {
          wx.showLoading({
            title: '上传中…',
          })
          chooseResult.tempFilePaths.forEach((item, index1) => {
            //上传至云存储
            wx.cloud.uploadFile({
              // 上传至指定路径
              cloudPath: new Date().getTime() + '.jpg',
              //指定要上传的文件的小程序临时文件路径
              filePath: item,
              // 成功回调
              success: res => {
                wx.hideLoading()
                console.log("上传成功", res)

                that.setData({
                  imgurl: res.fileID
                })
                that.addImgList(res.fileID)
              }
            })
          })
        }
      })
    }
  },

  onSumbit: function (e) {
    this.setData({
      name: e.detail.value.name,
      describe: e.detail.value.describe
      // username: app.globalData.userinfo.name,
      // phoneNumber: app.globalData.userinfo.phoneNumber,
      // weichatNumber: app.globalData.userinfo.weichatNumber
    })
  },

// //上传文件路径，没有问题
//   uploadImg(fileurl){
//     wx.cloud.uploadFile({
//         cloudPath: new Date().getTime()+'.jpg',
//         filePath: fileurl, // 文件路径
//         success: res => {
//           // get resource ID
//           console.log("success",res)
//           this.setData({
//             imgurl:res.fileID
//           })
//         },
//         fail: err => {
//           // handle error
//           console.log("上传失败1")
//         }
//     })
//   },
})