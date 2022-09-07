export interface IUserData {
  id?: number
  email?: string
  fullname?: string
  avatarUrl?: string
  isActive?: boolean
  username?: string
  phone?: string
  provider?: string
}

export interface IUserById extends IUserData {
  followers?: number
  following?: number
  about?: string
}
