Page({
  data: {
    statusBarHeight: 20
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo()
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
  },

  onLoginTap() {
    wx.showToast({
      title: '登录 / 注册',
      icon: 'none'
    })
  },

  onServiceTap() {
    wx.showToast({
      title: '客服',
      icon: 'none'
    })
  },

  onOnlineServiceTap() {
    wx.showToast({
      title: '在线客服',
      icon: 'none'
    })
  },

  onFeedbackTap() {
    wx.showToast({
      title: '我要反馈',
      icon: 'none'
    })
  }
})
