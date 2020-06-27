// pages/editNote/editNote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    titleInput: '',
    datalist: [],
    date: '',
    contentInput: '',
    index: '',
  },

  //监听标题的改变
  changeTitle: function (e) {
    this.setData({
      titleInput: e.detail.value
    })
  },

  // 监听内容的改变
  changeContent: function (e) {
    this.setData({
      contentInput: e.detail.value
    })
  },

  //编辑或新增备忘录
  updata: function (e) {
    const _this=this
    if (this.data.titleInput == "") {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.contentInput == "") {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    //判断index是否为空，不为空则是修改数据，为空是新增备忘录
    if (this.data.index != '') {
      app.globalData.arrlist[this.data.index] = {
        title: _this.data.titleInput,
        content: _this.data.contentInput,
        date: _this.data.date
      }
    } else {
      app.globalData.arrlist.push({
        title: _this.data.titleInput,
        content: _this.data.contentInput,
        date: _this.data.date
      })
      
    }

    // 更新缓存，将刚才改变的备忘录数组重新缓存在本地
    wx.setStorage({
      key: "note",
      data: app.globalData.arrlist
    })

    this.sendMsg()
    app.globalData.info=1

    // 保存好跳转到notebook界面
    wx.redirectTo({
      url: "../notebook/notebook"
    })
  },

  // 点击返回跳转到notebook界面
  back: function () {
    wx.redirectTo({
      url: '../notebook/notebook'
    })
  },


  // 发送消息
  sendMsg: function () {
    if (this.data.contentInput == '') {
      return;
    }
    
    let _this = this;
    let query = this.data.contentInput;
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
        app.globalData.chatlists.push(obj)
        // 使用setdata更新数据，才会触发数据驱动
        _this.setData({
          chatlists: app.globalData.chatlists
        });
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

    // 获取当前时间，并更新date
    const util = require("../../utils/util")
    this.setData({
      date: util.formatTime(new Date()),
    })

    // 如果有参数传进则为编辑备忘录
    if (options.title) {
      console.log("修改数据")
      this.setData({
        titleInput: options.title,
        contentInput: options.content,
        index: options.index
      })
    }


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