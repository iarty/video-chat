import { apiV1 } from '../core/request'
import { IUserData } from '../models/user'

export const UserApi = {
  getMe: async (): Promise<IUserData | null> => {
    try {
      const { data } = await apiV1.get('/auth/me')

      return data
    } catch (e) {
      return null
    }
  },
}
