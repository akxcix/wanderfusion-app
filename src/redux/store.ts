import { configureStore, Action } from "@reduxjs/toolkit";
import { RootState, SetPayloadAction } from "./types";

const initialState: RootState = {
  jwtPayload: null,
};

const rootReducer = (state = initialState, action: Action): RootState => {
  switch (action.type) {
    case "SET_JWT_PAYLOAD":
      return { ...state, jwtPayload: (action as SetPayloadAction).payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
