Page({
  data: {
    statusBarHeight: 20,
    searchValue: '',
    spaceExpanded: false,
    banners: [
      {
        id: 1,
        tag: 'NEW SEASON',
        title: '中古客厅',
        desc: '温润木质 · 留白生活',
        theme: 'warm'
      },
      {
        id: 2,
        tag: 'EDITORIAL',
        title: '卧室灵感',
        desc: '低饱和织物与柔和灯光',
        theme: 'sand'
      },
      {
        id: 3,
        tag: 'CURATED',
        title: '餐厅美学',
        desc: '器物与餐桌的秩序感',
        theme: 'stone'
      }
    ],
    primarySpaces: [
      { id: 'living', name: '客厅', abbr: '厅', bgColor: '#E8E2D8' },
      { id: 'bedroom', name: '卧室', abbr: '卧', bgColor: '#EDE6DC' },
      { id: 'dining', name: '餐厅', abbr: '餐', bgColor: '#E5DDD2' },
      { id: 'study', name: '书房', abbr: '书', bgColor: '#E0DAD0' }
    ],
    extraSpaces: [
      { id: 'balcony', name: '阳台', abbr: '阳', bgColor: '#E9E4DB' },
      { id: 'entry', name: '玄关', abbr: '玄', bgColor: '#E6E0D6' },
      { id: 'coffee', name: '咖啡角', abbr: '咖', bgColor: '#EBE5DB' },
      { id: 'workspace', name: '工作区', abbr: '工', bgColor: '#DFD9CF' },
      { id: 'closet', name: '衣帽间', abbr: '衣', bgColor: '#E8E3D9' }
    ],
    activeMoodId: 'all',
    moodTags: [
      { id: 'all', name: '全部' },
      { id: 'wood', name: '温暖木质感' },
      { id: 'retro', name: '复古电影感' },
      { id: 'wabi', name: '自然侘寂' },
      { id: 'cafe', name: '咖啡馆氛围' },
      { id: 'heal', name: '自然治愈感' },
      { id: 'dark', name: '暗调艺术感' }
    ],
    inspireAll: [
      {
        id: 1,
        moodId: 'wood',
        title: '温暖木质中古客厅',
        desc: '胡桃木 + 暖灯光氛围',
        likes: 1284,
        favorites: 326,
        theme: 'wood'
      },
      {
        id: 2,
        moodId: 'retro',
        title: '复古电影感卧室角落',
        desc: '深棕皮革与黄铜台灯',
        likes: 986,
        favorites: 241,
        theme: 'retro'
      },
      {
        id: 3,
        moodId: 'wabi',
        title: '自然侘寂玄关',
        desc: '亚麻帘与枯枝插花',
        likes: 756,
        favorites: 198,
        theme: 'wabi'
      },
      {
        id: 4,
        moodId: 'cafe',
        title: '咖啡馆氛围阅读角',
        desc: '橡木书架与柔雾灯带',
        likes: 642,
        favorites: 175,
        theme: 'cafe'
      },
      {
        id: 5,
        moodId: 'heal',
        title: '自然治愈感阳台',
        desc: '藤编椅与绿植光影',
        likes: 1102,
        favorites: 289,
        theme: 'heal'
      },
      {
        id: 6,
        moodId: 'dark',
        title: '暗调艺术感餐厅',
        desc: '炭黑墙面与烛光层次',
        likes: 534,
        favorites: 142,
        theme: 'dark'
      },
      {
        id: 7,
        moodId: 'wood',
        title: '胡桃木餐桌日常',
        desc: '器物陈列的秩序美学',
        likes: 423,
        favorites: 118,
        theme: 'wood'
      },
      {
        id: 8,
        moodId: 'heal',
        title: '晨光里的布艺沙发',
        desc: '米白织物与原木边几',
        likes: 891,
        favorites: 203,
        theme: 'heal'
      }
    ],
    inspireList: [],
    ugcList: [
      {
        id: 1,
        title: '入住后最满意的中古角落',
        desc: '胡桃木边柜真的太提升氛围',
        likes: 1286,
        comments: 97,
        theme: 'home1'
      },
      {
        id: 2,
        title: '周末早晨的餐厅光线',
        desc: '亚麻桌布配中古椅，刚刚好',
        likes: 864,
        comments: 56,
        theme: 'home2'
      },
      {
        id: 3,
        title: '小户型也能有的阅读角',
        desc: '一盏落地灯让空间温柔起来',
        likes: 642,
        comments: 41,
        theme: 'home3'
      },
      {
        id: 4,
        title: '玄关改造前后对比',
        desc: '换了镜面和收纳柜，进门就治愈',
        likes: 1103,
        comments: 88,
        theme: 'home4'
      },
      {
        id: 5,
        title: '阳台上的咖啡时光',
        desc: '藤编椅是今年夏天最值的一件',
        likes: 756,
        comments: 63,
        theme: 'home5'
      },
      {
        id: 6,
        title: '卧室NIGHT ROUTINE',
        desc: '暖黄台灯+棉麻床品，太好睡了',
        likes: 512,
        comments: 34,
        theme: 'home6'
      }
    ],
    guessTabIndex: 0,
    guessTabKeys: ['recommend', 'new', 'hot'],
    guessProducts: {
      recommend: [
        { id: 'gr1', title: '胡桃木边柜', desc: '客厅收纳 · 温润木质', price: '1,299', coverTheme: 'g1', image: '' },
        { id: 'gr2', title: '亚麻落地灯', desc: '柔光阅读 · 卧室氛围', price: '459', coverTheme: 'g2', image: '' },
        { id: 'gr3', title: '中古皮革单椅', desc: '深棕复古 · 客厅角落', price: '899', coverTheme: 'g3', image: '' },
        { id: 'gr4', title: '橡木餐桌 1.4m', desc: '小户型 · 自然纹理', price: '1,899', coverTheme: 'g4', image: '' },
        { id: 'gr5', title: '棉麻餐椅', desc: '软包靠背 · 餐区搭配', price: '329', coverTheme: 'g5', image: '' },
        { id: 'gr6', title: '藤编收纳篮', desc: '玄关整理 · 三件套', price: '168', coverTheme: 'g6', image: '' }
      ],
      new: [
        { id: 'gn1', title: '曲木休闲椅', desc: '新品 · 北欧中古', price: '759', coverTheme: 'g2', image: '' },
        { id: 'gn2', title: '磨砂玻璃茶几', desc: '新品 · 客厅边几', price: '599', coverTheme: 'g1', image: '' },
        { id: 'gn3', title: '陶瓷花瓶套装', desc: '新品 · 餐桌摆件', price: '199', coverTheme: 'g5', image: '' },
        { id: 'gn4', title: '羊毛混纺地毯', desc: '新品 · 客厅地垫', price: '899', coverTheme: 'g4', image: '' },
        { id: 'gn5', title: '黄铜壁灯', desc: '新品 · 床头氛围', price: '428', coverTheme: 'g3', image: '' },
        { id: 'gn6', title: '实木床尾凳', desc: '新品 · 卧室长凳', price: '649', coverTheme: 'g6', image: '' }
      ],
      hot: [
        { id: 'gh1', title: '人体工学椅', desc: '热销 · 家用办公', price: '699', coverTheme: 'g4', image: '' },
        { id: 'gh2', title: '折叠露营椅', desc: '热销 · 户外便携', price: '259', coverTheme: 'g5', image: '' },
        { id: 'gh3', title: '中古电视柜', desc: '热销 · 客厅收纳', price: '1,599', coverTheme: 'g1', image: '' },
        { id: 'gh4', title: '记忆棉床垫', desc: '热销 · 1.8m 双人', price: '1,199', coverTheme: 'g6', image: '' },
        { id: 'gh5', title: '厨房置物架', desc: '热销 · 多层收纳', price: '289', coverTheme: 'g2', image: '' },
        { id: 'gh6', title: '推拉门衣柜', desc: '热销 · 卧室极简', price: '2,299', coverTheme: 'g3', image: '' }
      ]
    },
    guessProductList: []
  },

  updateGuessFeed(tabIndex) {
    const key = this.data.guessTabKeys[tabIndex] || 'recommend'
    const list = this.data.guessProducts[key] || []
    this.setData({
      guessTabIndex: tabIndex,
      guessProductList: list
    })
  },

  filterInspireList(moodId, list) {
    if (moodId === 'all') return list
    return list.filter((item) => item.moodId === moodId)
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo()
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20,
      inspireList: this.filterInspireList('all', this.data.inspireAll)
    })
    this.updateGuessFeed(0)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
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

  onBannerTap(e) {
    const { id } = e.currentTarget.dataset
    wx.showToast({
      title: `Banner ${id}`,
      icon: 'none'
    })
  },

  onSpaceTap(e) {
    const { name } = e.currentTarget.dataset
    wx.showToast({
      title: name,
      icon: 'none'
    })
  },

  toggleSpaceExpand() {
    this.setData({
      spaceExpanded: !this.data.spaceExpanded
    })
  },

  onMoodTagTap(e) {
    const { id } = e.currentTarget.dataset
    this.setData({
      activeMoodId: id,
      inspireList: this.filterInspireList(id, this.data.inspireAll)
    })
  },

  onInspireSeeMore() {
    wx.showToast({
      title: '查看更多搭配灵感',
      icon: 'none'
    })
  },

  onInspireCardTap(e) {
    const { id } = e.currentTarget.dataset
    const card = this.data.inspireList.find((item) => item.id === id)
    if (!card) return
    wx.showToast({
      title: card.title,
      icon: 'none'
    })
  },

  onUgcSeeMore() {
    wx.showToast({
      title: '查看更多用户晒单',
      icon: 'none'
    })
  },

  onUgcCardTap(e) {
    const { id } = e.currentTarget.dataset
    const card = this.data.ugcList.find((item) => item.id === id)
    if (!card) return
    wx.showToast({
      title: card.title,
      icon: 'none'
    })
  },

  onGuessTabChange(e) {
    const tabIndex = e.detail.index
    this.updateGuessFeed(tabIndex)
  },

  onGuessProductTap(e) {
    const { id } = e.currentTarget.dataset
    const product = this.data.guessProductList.find((item) => item.id === id)
    if (!product) return
    wx.showToast({
      title: product.title,
      icon: 'none'
    })
  }
})
