// pages/chat/chat.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatlists: [],
    userInfo: {},
    mechInfo: {},
    inputValue: '',
  },
  getInputData: function (e) {

    this.setData({
      inputValue: e.detail.value
    });
  },
  sendMsg: function () {
    if (this.data.inputValue == '') {
      wx.showToast({
        title: '消息不能为空~~~',
        duration: 2000
      })
      return;
    }
    let nickname = this.data.userInfo.nickName;
    let avatar = this.data.userInfo.avatarUrl;
    let content = this.data.inputValue;
    let obj = {
      nickname: nickname,
      avatar,
      content
    };
    let chatlists = this.data.chatlists;
    let query = this.data.inputValue;
    // chatlists.push(obj);
    app.globalData.chatlists.push(obj);
    this.setData({
      chatlists: app.globalData.chatlists,
      inputValue: ''
    });
    let _this = this;
    wx.request({
      url: 'http://localhost:81/chat',
      data: {
        query: query
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        let obj = {
          nickname: app.globalData.obj.nickname,
          avatar: app.globalData.obj.avatar,
          content: res.data.Reply
        };
        let chatlists = _this.data.chatlists;
        app.globalData.chatlists.push(obj)
        // 使用setdata更新数据，才会触发数据驱动
        _this.setData({
          chatlists: chatlists
        });
        // 把屏幕滚动到最下面
        wx.pageScrollTo({
          scrollTop: 100000000,
          duration: 300
        })
        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = 'http://d.datouwang.com/uploads/file/yinxiao/2015/yinxiao114.mp3'
        innerAudioContext.onCanplay(() => {
          console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.flag) {
      app.globalData.chatlists.push({
        nickname: app.globalData.obj.nickname,
        avatar: app.globalData.obj.avatar,
        content: '今天有想我吗'
      }),
      app.globalData.flag = !app.globalData.flag;
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      mechInfo: app.globalData.obj,
      chatlists: app.globalData.chatlists
    })
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

  }
})