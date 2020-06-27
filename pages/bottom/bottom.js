// pages/bottom/bottom.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: '',
    mechInfo: {},
    info:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      app.globalData.active = event.detail;
      if (event.detail == 0) {
        app.globalData.info = ''
        wx.redirectTo({
          url: '../chat/chat'
        })
      } else if (event.detail == 1) {
        wx.redirectTo({
          url: '../notebook/notebook'
        })
      } else if (event.detail == 2) {
        wx.redirectTo({
          url: '../dingzhi/dingzhi'
        })
      }
      if (event.detail == 0) {
        wx.redirectTo({
          url: '../chat/chat'
        })
      }
      this.setData({
        active: event.detail
      });
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        mechInfo: app.globalData.obj,
        active: app.globalData.active,
        info: app.globalData.info
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})