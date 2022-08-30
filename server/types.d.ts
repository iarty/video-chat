declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

export interface IUserData {
  id?: string;
  email?: string;
  fullname?: string;
  avatarUrl?: string;
  isActive?: boolean;
  username?: string;
  phone?: string;
  provider?: string;
}
