// pages/components/callphone/callphone.js
Component({

  options:{
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    phoneNumber : String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCallPhone(){
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber,
        
      });
      console.log(this.data.phoneNumber)
    }
  }
})
