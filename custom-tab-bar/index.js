Component({
  data: {
    selected: 0,
    color: '#767676',
    selectedColor: '#0058a3',
    list: [
      {
        pagePath: '/pages/home/home',
        text: '首页',
        iconPath: '/assets/tab/home.png',
        selectedIconPath: '/assets/tab/home-active.png'
      },
      {
        pagePath: '/pages/category/category',
        text: '分类',
        iconPath: '/assets/tab/category.png',
        selectedIconPath: '/assets/tab/category-active.png'
      },
      {
        pagePath: '/pages/inspiration/inspiration',
        text: '灵感',
        iconPath: '/assets/tab/inspiration.png',
        selectedIconPath: '/assets/tab/inspiration-active.png'
      },
      {
        pagePath: '/pages/cart/cart',
        text: '购物车',
        iconPath: '/assets/tab/cart.png',
        selectedIconPath: '/assets/tab/cart-active.png'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        iconPath: '/assets/tab/profile.png',
        selectedIconPath: '/assets/tab/profile-active.png'
      }
    ]
  },

  methods: {
    switchTab(e) {
      const { path, index } = e.currentTarget.dataset
      wx.switchTab({ url: path })
      this.setData({ selected: index })
    }
  }
})
