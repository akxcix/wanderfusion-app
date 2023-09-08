export interface Root<T> {
  status: number;
  data: T;
}

// responses --------------------------------------------------------------------------------------
export interface LoginResponse {
  refreshToken: string;
  authToken: string;
}

// requests ---------------------------------------------------------------------------------------
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}
