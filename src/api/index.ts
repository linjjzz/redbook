const apiConfig: ApoConfigType = {
  login: {
    url: '/user/login',
    method: 'get'
  },
  homeList: {
    url: '/home/homeList',
    method: 'get'
  }
}

export type ApoConfigType = {
  login: { url: string, method: string },
  homeList: { url: string, method: string },
}

export type ApoConfigKeyType = keyof ApoConfigType

export default apiConfig