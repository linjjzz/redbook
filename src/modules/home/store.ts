import { request } from '@/utils/request'
import { create } from 'zustand'
import { load } from '@/utils/Storage'

const SIZE = 10

export type ArticleComment = {
  userName: string
  avatarUrl: string
  message: string
  dataTime: string
  location: string
  favoriteCount: number
  isFavorite: boolean
  children?: ArticleComment[]
}

export type Article = {
  id: number
  title: string
  desc: string
  tag: string[]
  dataTime: string
  location: string
  userId: number
  userName: string
  isFollow: boolean
  avatarUrl: string
  images: string[]
  favoriteCount: number
  collectionCount: number
  isFavorite: boolean
  isCollection: boolean
  comments: ArticleComment[]
}

export type ArticleSimple = {
  id: number
  title: string
  userName: string
  avatarUrl: string
  favoriteCount: number
  isFavorite: boolean
  image: string
}

export type HomeStateType = {
  page: number
  homeList: ArticleSimple[]
  refreshing: boolean
  categoryList: Category[]
  resetPage: () => void
  requestHomeList: () => any
  getCategoryList: () => any
}

export const HomeStore = create<HomeStateType>((set, get) => ({
  page: 1,
  size: SIZE,
  homeList: [],
  refreshing: false,
  categoryList: [],
  resetPage: () => set({ page: 1 }),
  requestHomeList: async () => {
    if (get().refreshing) return
    try {
      set({ refreshing: true })
      const params = {
        page: get().page,
        size: 10
      }
      const { data } = await request('homeList', params)
      if (data?.length) {
        if (get().page === 1) {
          set({ homeList: data })
        } else {
          set({ homeList: [...get().homeList, ...data] })
        }
        set({ page: get().page + 1 })
      } else {
        if (get().page === 1) {
          set({ homeList: [] })
        } else {
          //已经加载完了，没有更多数据
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      set({ refreshing: false })
    }
  },
  getCategoryList: async () => {
    const catchListStr = await load('categoryList')
    if (catchListStr) {
      const catchList = JSON.parse(catchListStr)
      if (catchList?.length) {
        set({ categoryList: catchList })
      } else {
        set({ categoryList: DEFAULT_CATEGORY_LIST })
      }
    } else {
      set({ categoryList: DEFAULT_CATEGORY_LIST })
    }
  }
}))

export type Category = {
  name: string;
  default: boolean;
  isAdd: boolean;
}

const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  { name: '推荐', default: true, isAdd: true },
  { name: '视频', default: true, isAdd: true },
  { name: '直播', default: true, isAdd: true },
  { name: '摄影', default: false, isAdd: true },

  { name: '穿搭', default: false, isAdd: true },
  { name: '读书', default: false, isAdd: true },
  { name: '影视', default: false, isAdd: true },
  { name: '科技', default: false, isAdd: true },

  { name: '健身', default: false, isAdd: true },
  { name: '科普', default: false, isAdd: true },
  { name: '美食', default: false, isAdd: true },
  { name: '情感', default: false, isAdd: true },

  { name: '舞蹈', default: false, isAdd: true },
  { name: '学习', default: false, isAdd: true },
  { name: '男士', default: false, isAdd: true },
  { name: '搞笑', default: false, isAdd: true },

  { name: '汽车', default: false, isAdd: true },
  { name: '职场', default: false, isAdd: true },
  { name: '运动', default: false, isAdd: true },
  { name: '旅行', default: false, isAdd: true },

  { name: '音乐', default: false, isAdd: true },
  { name: '护肤', default: false, isAdd: true },
  { name: '动漫', default: false, isAdd: true },
  { name: '游戏', default: false, isAdd: true },

  // 默认添加频道
  { name: '家装', default: false, isAdd: false },
  { name: '心理', default: false, isAdd: false },
  { name: '户外', default: false, isAdd: false },
  { name: '手工', default: false, isAdd: false },

  { name: '减脂', default: false, isAdd: false },
  { name: '校园', default: false, isAdd: false },
  { name: '社科', default: false, isAdd: false },
  { name: '露营', default: false, isAdd: false },

  { name: '文化', default: false, isAdd: false },
  { name: '机车', default: false, isAdd: false },
  { name: '艺术', default: false, isAdd: false },
  { name: '婚姻', default: false, isAdd: false },

  { name: '家居', default: false, isAdd: false },
  { name: '母婴', default: false, isAdd: false },
  { name: '绘画', default: false, isAdd: false },
  { name: '壁纸', default: false, isAdd: false },

  { name: '头像', default: false, isAdd: false },
];