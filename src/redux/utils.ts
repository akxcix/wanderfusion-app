import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { Payload, SetPayloadAction } from "./types";
import { RootState } from "./types"; // Import RootState from your store.ts

export const useSetPayload = () => {
  const dispatch = useDispatch();
  return (token: string) => {
    try {
      const payload: Payload = jwtDecode(token);
      const action: SetPayloadAction = { type: "SET_JWT_PAYLOAD", payload };
      dispatch(action);
    } catch (error) {
      // Handle error
    }
  };
};

export const useGetEmail = () => {
  const jwtPayload = useSelector((state: RootState) => state.jwtPayload);
  return jwtPayload ? jwtPayload.email : null;
};

export const useGetUsername = () => {
  const jwtPayload = useSelector((state: RootState) => state.jwtPayload);
  return jwtPayload
    ? jwtPayload.username
      ? "@" + jwtPayload.username
      : undefined
    : undefined;
};

export const useGetProfilePic = () => {
  const jwtPayload = useSelector((state: RootState) => state.jwtPayload);
  return jwtPayload ? jwtPayload.profilePicture : undefined;
};
