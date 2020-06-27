// pages/dingzhi/dingzhi.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    persons: [{
      avatar: "../img/1.jpeg",
      nickname: 'Kris',
    }, {
      avatar: "../img/2.jpg",
      nickname: '是IU呐',
    }, {
      avatar: "../img/3.jpg",
      nickname: '小李子',
    }, {
      avatar: "../img/4.jpg",
      nickname: 'Johansson',
    }],
    columns: ['高冷', '可爱', '粘人', '腼腆'],
    avatar: '',
    inputName: '',
  },

  //确认自定义机器人方法
  onConfirm(event) {
    const _this = this
    if (this.data.avatar == '') {
      wx.showToast({
        title: '头像不能为空嗷~~~',
        duration: 2000
      })
      return;
    }
    if (this.data.inputName == '') {
      wx.showToast({
        title: '昵称不能为空嗷~~~',
        duration: 2000
      })
      return;
    }
    Dialog.confirm({
        title: '更改机器人',
        message: '确认使用该定制类型吗',
      })
      .then(() => {
        // on confirm
        wx.saveFile({
          tempFilePath: this.data.avatar, // 传入一个临时文件路径
          success(res) {
            console.log('图片缓存成功', res.savedFilePath)
            app.globalData.obj.avatar=res.savedFilePath
            wx.setStorage({
              key: "image_cache",
              data: res.savedFilePath
            })
          },
          fail(error) {
            console.log('失败')
            console.log(error.errMsg)
          }
        })
        
        wx.setStorage({
          key: "nickname",
          data: this.data.inputName
        })
        app.globalData.obj.nickname = this.data.inputName;
        app.globalData.obj.avatar = this.data.avatar;
        Notify({
          type: 'success',
          message: '更改成功，去试试新的机器人叭！'
        });
        app.globalData.flag = 1
        app.globalData.flag = true;
        this.refresh();
      })
      .catch(() => {
        // on cancel
      });
  },

  //监听昵称变化
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      inputName: event.detail
    });
  },

  //读取图片缓存，并将缓存地址保存到avatar
  afterRead(event) {
    this.setData({
      avatar: event.detail.file.path,
    })
  },
  
  //更改推荐机器人
  bindObjTap: function (e) {
    const _this = this
    Dialog.confirm({
        title: '更换机器人',
        message: '确认使用该机器人吗？',
      })
      .then(() => {
        // on confirm
        console.log(e.currentTarget.dataset.avatar)
        wx.setStorage({
          key: "image_cache",
          data: e.currentTarget.dataset.avatar
        })
        wx.setStorage({
          key: "nickname",
          data: e.currentTarget.dataset.nickname
        })
        app.globalData.obj.nickname = e.currentTarget.dataset.nickname;
        app.globalData.obj.avatar = e.currentTarget.dataset.avatar;
        Notify({
          type: 'success',
          message: '更改成功，去试试新的机器人叭！'
        });
        app.globalData.flag = 1
        app.globalData.flag = true;
        _this.refresh()
      })
      .catch(() => {
        // on cancel
      });
  },
  // 刷新消息数以及发送提示音并刷新界面
  refresh:function(){
    //更新消息数
    app.globalData.info = 1
    //发送提示音
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
    wx.redirectTo({
      url: '../dingzhi/dingzhi'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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