// src/lib/types/auth.ts
export interface User {
  id: number;
  username: string;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Quote {
  _id: string;
  content: string;
  author: string;
  userId?: number;
  keyword?: string;
}

