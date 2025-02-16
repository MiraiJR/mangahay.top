import { createContext, ReactNode, useContext, useState } from "react";
import { userStore } from "../stores/user-storage";
import MeService from "../services/meService";
import { useQuery } from "@tanstack/react-query";
import { LoadingFullPage } from "../components/base-components/loading/LoadingFullPage";
import jwt from "../libs/jwt";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isAdminOrTranslator: boolean;
  loggedInUserId: number;
  loggedInUser?: User;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!jwt.getToken());
  const [loggedInUserId, setLoggedInUserId] = useState<number>(-1);

  const [isAdminOrTranslator, setIsAdminOrTranslator] =
    useState<boolean>(false);
  const { setUserProfile } = userStore();

  jwt.onDeleteToken(() => {
    setIsLoggedIn(false);
  });

  const { data: loggedInUser, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await MeService.getMe();

      setUserProfile(data);
      setLoggedInUserId(data.id);
      if (["admin", "translator"].includes(data.role)) {
        setIsAdminOrTranslator(true);
      } else {
        setIsAdminOrTranslator(false);
      }

      setIsLoggedIn(true);
      return data;
    },
  });

  return (
    <AuthContext.Provider
      value={{
        loggedInUserId,
        isLoggedIn,
        setIsLoggedIn,
        isAdminOrTranslator,
        loggedInUser,
      }}
    >
      {isLoading ? <LoadingFullPage /> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context not found");
  }
  return context;
};
