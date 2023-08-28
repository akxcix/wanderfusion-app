export interface Payload {
  id: string;
  email: string;
  username: string;
  profilePicture: string;
  expiresAt: string;
}

export interface RootState {
  jwtPayload: Payload | null;
}

export interface SetPayloadAction {
  type: "SET_JWT_PAYLOAD";
  payload: Payload;
}
