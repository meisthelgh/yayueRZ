const CATEGORIES = [
  { id: 'living', name: '客厅家具' },
  { id: 'bedroom', name: '卧室家具' },
  { id: 'dining', name: '餐厅家具' },
  { id: 'study', name: '书房家具' },
  { id: 'lighting', name: '灯具照明' },
  { id: 'textile', name: '地毯布艺' },
  { id: 'decor', name: '装饰摆件' },
  { id: 'art', name: '挂画装饰' },
  { id: 'storage', name: '收纳柜架' },
  { id: 'kitchen', name: '餐厨器皿' },
  { id: 'plant', name: '花瓶绿植' },
  { id: 'mirror', name: '镜子玄关' },
  { id: 'scent', name: '香薰蜡烛' },
  { id: 'vintage', name: '中古专区' }
]

const PRODUCT_NAMES = {
  living: ['胡桃木茶几', '中古皮革沙发', '橡木电视柜', '亚麻单人椅', '曲木边几', '藤编收纳凳'],
  bedroom: ['实木床架', '棉麻床头板', '中古床头柜', '羊毛混纺地毯', '亚麻四件套', '复古穿衣镜'],
  dining: ['橡木餐桌', '棉麻餐椅', '陶瓷餐具套装', '黄铜吊灯', '亚麻桌旗', '玻璃醒酒器'],
  study: ['胡桃木书桌', '人体工学椅', '多层书架', '黄铜台灯', '皮革文件盒', '曲木书立'],
  lighting: ['亚麻落地灯', '黄铜壁灯', '中古台灯', '玻璃吊灯', '柔光氛围灯', '轨道射灯'],
  textile: ['羊毛地毯', '亚麻窗帘', '棉麻抱枕', '针织盖毯', '手工挂毯', '餐垫套装'],
  decor: ['陶瓷花瓶', '黄铜烛台', '木质托盘', '中古摆件', '玻璃器皿', '手工雕塑'],
  art: ['抽象挂画', '摄影版画', '组合画框', '中古海报', '极简线条画', '风景艺术画'],
  storage: ['胡桃木边柜', '藤编收纳篮', '开放式书架', '玄关鞋柜', '厨房置物架', '卧室衣柜'],
  kitchen: ['手工陶瓷碗', '橡木砧板', '玻璃储物罐', '黄铜咖啡壶', '亚麻餐巾', '铸铁锅具'],
  plant: ['陶土花盆', '干花插瓶', '绿植支架', '编织花篮', '玻璃花瓶', '中古花器'],
  mirror: ['拱形穿衣镜', '玄关壁镜', '浴室圆镜', '中古台镜', '金属框镜', '落地全身镜'],
  scent: ['大豆香薰蜡烛', '扩香藤条', '线香套装', '精油 diffuser', '手工香包', '雪松蜡烛'],
  vintage: ['中古边柜', '复古皮椅', '老木头凳', '黄铜台灯', '怀旧海报', '做旧收纳箱']
}

const COVER_THEMES = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']

function buildProducts() {
  const map = {}
  CATEGORIES.forEach((cat) => {
    const names = PRODUCT_NAMES[cat.id] || []
    map[cat.id] = names.map((name, index) => ({
      id: `${cat.id}_${index + 1}`,
      name,
      coverTheme: COVER_THEMES[index % COVER_THEMES.length],
      image: ''
    }))
  })
  return map
}

const ALL_PRODUCTS = buildProducts()

Page({
  data: {
    searchValue: '',
    activeKey: 0,
    bodyHeight: 600,
    productScrollTop: 0,
    categories: CATEGORIES,
    productList: ALL_PRODUCTS.living || []
  },

  onLoad() {
    this.loadProducts(0)
  },

  onReady() {
    this.updateBodyHeight()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    this.updateBodyHeight()
  },

  getTabBarHeightPx() {
    const info = wx.getWindowInfo()
    const rpx = info.windowWidth / 750
    const tabBarRpx = 120
    const safeBottom = info.screenHeight - info.safeArea.bottom
    return Math.ceil(tabBarRpx * rpx + safeBottom)
  },

  updateBodyHeight() {
    const info = wx.getWindowInfo()
    const tabBarPx = this.getTabBarHeightPx()

    wx.createSelectorQuery()
      .in(this)
      .select('.search-wrap')
      .boundingClientRect((rect) => {
        const searchHeight = rect ? rect.height : 0
        const bodyHeight = info.windowHeight - searchHeight - tabBarPx
        this.setData({
          bodyHeight: Math.max(bodyHeight, 400)
        })
      })
      .exec()
  },

  loadProducts(index) {
    const category = CATEGORIES[index]
    if (!category) return
    const list = ALL_PRODUCTS[category.id] || []
    this.setData({
      activeKey: index,
      productList: list,
      productScrollTop: 0
    })
  },

  onCategoryChange(e) {
    this.loadProducts(e.detail)
  },

  onSearchChange(e) {
    this.setData({ searchValue: e.detail })
  },

  onSearch(e) {
    const keyword = (e.detail || this.data.searchValue || '').trim()
    if (!keyword) return
    wx.showToast({
      title: `搜索：${keyword}`,
      icon: 'none'
    })
  },

  onProductTap(e) {
    const { id } = e.currentTarget.dataset
    const product = this.data.productList.find((item) => item.id === id)
    if (!product) return
    wx.showToast({
      title: product.name,
      icon: 'none'
    })
  }
})
