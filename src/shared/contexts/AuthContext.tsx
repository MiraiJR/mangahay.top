import { createContext, ReactNode, useContext, useState } from "react";
import { userStore } from "../stores/user-storage";
import MeService from "../services/meService";
import { useQuery } from "@tanstack/react-query";
import { LoadingFullPage } from "../components/LoadingFullPage";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isAdminOrTranslator: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [isAdminOrTranslator, setIsAdminOrTranslator] =
    useState<boolean>(false);
  const { setUserProfile } = userStore();

  const { isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await MeService.getMe();

      setUserProfile(data);
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
      value={{ isLoggedIn, setIsLoggedIn, isAdminOrTranslator }}
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
