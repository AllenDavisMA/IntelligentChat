// pages/notebook/notebook.js
const app = getApp()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrlist:[]
  },

  // 跳转到新增界面
  edit: function () {
    wx.navigateTo({
      url: "../editNote/editNote"
    })
  },

  // 跳转到编辑界面并传参
  goto: function (e) {
    wx.navigateTo({
      url: '../editNote/editNote?title='+e.currentTarget.dataset.title+"&content="+e.currentTarget.dataset.content+"&index="+e.currentTarget.dataset.index,
    })
  },

  // 删除备忘录
  delete: function(e) {
    console.log(e.currentTarget.dataset.index)
    Dialog.confirm({
      message: '确定删除吗？',
    }).then(() => {
      app.globalData.arrlist.splice(e.currentTarget.dataset.index,1)
      wx.setStorage({
        key: "note",
        data: app.globalData.arrlist
      })
      this.onLoad()
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 更新当前arrlist
    this.setData({
      arrlist:app.globalData.arrlist
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