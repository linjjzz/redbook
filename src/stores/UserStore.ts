import { request } from '@/utils/request'
import { save } from '@/utils/Storage'
import { create } from 'zustand'

export type UserStateType = {
  userInfo: any
  requestLogin: (phone: string, pwd: string) => any
}

export const UserStore = create<UserStateType>((set) => ({
  userInfo: {},
  requestLogin: async (phone: string, pwd: string) => {
    try {
      const params = {
        name: phone,
        pwd: pwd,
      }
      const { data } = await request('login', params)
      if (data) {
        save('userInfo', JSON.stringify(data))
      }
      set({ userInfo: data })
      return data
    } catch (error) {
      set({ userInfo: null })
      return null
    }
  }
}))
