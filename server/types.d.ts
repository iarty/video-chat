declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

export interface IUserData {
  id?: number;
  email?: string;
  fullname?: string;
  avatarUrl?: string;
  isActive?: number;
  username?: string;
  phone?: string;
  provider?: string;
}
