Page({
  data: {
    statusBarHeight: 20,
    heroImage: ''
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo()
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  onLoginTap() {
    wx.showToast({
      title: '登录 / 注册',
      icon: 'none'
    })
  },

  onBizTap() {
    wx.showToast({
      title: '企业采购 / 设计师合作',
      icon: 'none'
    })
  }
})
