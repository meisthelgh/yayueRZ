const TOPICS = [
  { id: 't1', title: '#东京旧公寓氛围', inspirations: '128', views: '12.8万', desc: '旧木与暖光交织的午后', theme: 't1' },
  { id: 't2', title: '#复古电影感客厅', inspirations: '96', views: '9.6万', desc: '深棕皮革与黄铜台灯', theme: 't2' },
  { id: 't3', title: '#咖啡馆式卧室', inspirations: '82', views: '8.2万', desc: '橡木书架与柔雾灯带', theme: 't3' },
  { id: 't4', title: '#胡桃木治愈角落', inspirations: '75', views: '7.5万', desc: '器物与留白的秩序感', theme: 't4' },
  { id: 't5', title: '#一个人住的中古家', inspirations: '63', views: '6.3万', desc: '真实家庭空间分享', theme: 't5' },
  { id: 't6', title: '#雨天宅家灵感', inspirations: '51', views: '5.1万', desc: '亚麻织物与原木边几', theme: 't6' }
]

const SPACE_TAGS = [
  { id: 'all', name: '全部' },
  { id: 'living', name: '客厅' },
  { id: 'bedroom', name: '卧室' },
  { id: 'dining', name: '餐厅' },
  { id: 'study', name: '书房' },
  { id: 'entry', name: '玄关' },
  { id: 'balcony', name: '阳台' }
]

const MOOD_TAGS = [
  { id: 'all', name: '全部' },
  { id: 'wood', name: '温暖木质感' },
  { id: 'retro', name: '复古电影感' },
  { id: 'wabi', name: '自然侘寂' },
  { id: 'cafe', name: '咖啡馆氛围' },
  { id: 'dark', name: '暗调艺术感' },
  { id: 'french', name: '法式中古' }
]

const COVER_HEIGHTS = [400, 460, 380, 440, 420, 480, 360, 450]

const ALL_FEED = [
  { id: 'f1', title: '东京旧公寓里的胡桃木角落', desc: '旧木与暖光交织的午后', likes: 2840, favorites: 612, coverTheme: 'f1', image: '', mainTab: 'recommend', spaceId: 'living', moodId: 'wood' },
  { id: 'f2', title: '复古电影感卧室', desc: '深棕皮革与黄铜台灯', likes: 1968, favorites: 438, coverTheme: 'f2', image: '', mainTab: 'recommend', spaceId: 'bedroom', moodId: 'retro' },
  { id: 'f3', title: '咖啡馆氛围客厅', desc: '橡木书架与柔雾灯带', likes: 1654, favorites: 392, coverTheme: 'f3', image: '', mainTab: 'recommend', spaceId: 'living', moodId: 'cafe' },
  { id: 'f4', title: '自然侘寂玄关', desc: '亚麻帘与枯枝插花', likes: 1420, favorites: 318, coverTheme: 'f4', image: '', mainTab: 'recommend', spaceId: 'entry', moodId: 'wabi' },
  { id: 'f5', title: '法式中古餐厅', desc: '器物与餐桌的秩序感', likes: 1286, favorites: 276, coverTheme: 'f5', image: '', mainTab: 'recommend', spaceId: 'dining', moodId: 'french' },
  { id: 'f6', title: '暗调艺术感书房', desc: '炭黑墙面与烛光层次', likes: 986, favorites: 214, coverTheme: 'f6', image: '', mainTab: 'recommend', spaceId: 'study', moodId: 'dark' },
  { id: 'f7', title: '阳台上的咖啡时光', desc: '藤编椅与绿植光影', likes: 1102, favorites: 289, coverTheme: 'f1', image: '', mainTab: 'recommend', spaceId: 'balcony', moodId: 'cafe' },
  { id: 'f8', title: '晨光里的布艺沙发', desc: '米白织物与原木边几', likes: 891, favorites: 203, coverTheme: 'f2', image: '', mainTab: 'recommend', spaceId: 'living', moodId: 'wood' },
  { id: 'u1', title: '入住后的中古客厅一角', desc: '真实家庭空间分享', likes: 756, favorites: 168, coverTheme: 'f3', image: '', mainTab: 'user', spaceId: 'living', moodId: 'wood' },
  { id: 'u2', title: '小户型阅读角改造', desc: '一盏落地灯改变氛围', likes: 642, favorites: 141, coverTheme: 'f4', image: '', mainTab: 'user', spaceId: 'study', moodId: 'cafe' },
  { id: 'u3', title: '玄关改造前后', desc: '镜面与收纳的治愈感', likes: 1103, favorites: 256, coverTheme: 'f5', image: '', mainTab: 'user', spaceId: 'entry', moodId: 'wabi' },
  { id: 'u4', title: '卧室NIGHT ROUTINE', desc: '暖黄台灯与棉麻床品', likes: 512, favorites: 118, coverTheme: 'f6', image: '', mainTab: 'user', spaceId: 'bedroom', moodId: 'retro' }
]

Page({
  data: {
    searchValue: '',
    topics: TOPICS,
    mainTabs: [
      { id: 'recommend', name: '推荐', dropdown: false },
      { id: 'space', name: '空间', dropdown: true },
      { id: 'mood', name: '氛围', dropdown: true },
      { id: 'user', name: '用户案例', dropdown: false }
    ],
    activeMainTab: 'recommend',
    activeFilterId: 'all',
    panelOpen: false,
    panelTags: [],
    feedLeftList: [],
    feedRightList: []
  },

  onLoad() {
    this.updateFeed()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  isDropdownTab(id) {
    return id === 'space' || id === 'mood'
  },

  getPanelTags(tabId) {
    if (tabId === 'space') return SPACE_TAGS
    if (tabId === 'mood') return MOOD_TAGS
    return []
  },

  filterFeed() {
    const { activeMainTab, activeFilterId } = this.data
    let list = ALL_FEED

    if (activeMainTab === 'recommend') {
      list = ALL_FEED.filter((item) => item.mainTab === 'recommend')
    } else if (activeMainTab === 'user') {
      list = ALL_FEED.filter((item) => item.mainTab === 'user')
    } else if (activeMainTab === 'space' && activeFilterId !== 'all') {
      list = ALL_FEED.filter((item) => item.spaceId === activeFilterId)
    } else if (activeMainTab === 'mood' && activeFilterId !== 'all') {
      list = ALL_FEED.filter((item) => item.moodId === activeFilterId)
    }

    return list.map((item, index) => ({
      ...item,
      coverHeight: COVER_HEIGHTS[index % COVER_HEIGHTS.length]
    }))
  },

  splitWaterfall(list) {
    const left = []
    const right = []
    list.forEach((item, index) => {
      if (index % 2 === 0) left.push(item)
      else right.push(item)
    })
    return { left, right }
  },

  updateFeed() {
    const list = this.filterFeed()
    const { left, right } = this.splitWaterfall(list)
    const { activeMainTab } = this.data
    this.setData({
      panelTags: this.getPanelTags(activeMainTab),
      feedLeftList: left,
      feedRightList: right
    })
  },

  onSearchChange(e) {
    this.setData({ searchValue: e.detail })
  },

  onSearch(e) {
    const keyword = (e.detail || this.data.searchValue || '').trim()
    if (!keyword) return
    wx.showToast({ title: `搜索：${keyword}`, icon: 'none' })
  },

  onTopicTap(e) {
    const { id } = e.currentTarget.dataset
    const topic = TOPICS.find((item) => item.id === id)
    if (!topic) return
    wx.showToast({ title: topic.title, icon: 'none' })
  },

  onMainTabTap(e) {
    const { id } = e.currentTarget.dataset
    if (!id) return

    const { activeMainTab, panelOpen } = this.data
    const isDropdown = this.isDropdownTab(id)

    if (id === activeMainTab && isDropdown) {
      this.setData({ panelOpen: !panelOpen })
      return
    }

    this.setData({
      activeMainTab: id,
      activeFilterId: 'all',
      panelOpen: isDropdown
    })
    this.updateFeed()
  },

  onFilterTagTap(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ activeFilterId: id })
    this.updateFeed()
  },

  onFeedTap(e) {
    const { id } = e.currentTarget.dataset
    const all = this.data.feedLeftList.concat(this.data.feedRightList)
    const item = all.find((feed) => feed.id === id)
    if (!item) return
    wx.showToast({ title: item.title, icon: 'none' })
  }
})
