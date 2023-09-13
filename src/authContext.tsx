import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LOCAL_STORAGE_KEYS } from "./commons/constants";

interface AuthContextProps {
  isLoggedOut: boolean;
  setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = () => {
      const refreshToken = localStorage.getItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN
      );

      setIsLoggedOut(!refreshToken);
    };

    checkToken();

    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedOut, setIsLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};
