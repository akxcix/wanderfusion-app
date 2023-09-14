export interface Root<T> {
  status: number;
  data: T;
}

// responses --------------------------------------------------------------------------------------
export interface LoginResponse {
  refreshToken: string;
  authToken: string;
}

export interface RefreshResponse {
  jwt: string;
}

// requests ---------------------------------------------------------------------------------------
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  jwt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

// base types -------------------------------------------------------------------------------------
export interface Member {
  id: string;
  username: string;
  profilePic: string;
}
