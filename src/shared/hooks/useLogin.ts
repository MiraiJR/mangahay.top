import { useEffect } from "react";
import jwt from "../libs/jwt";
import { globalStore } from "../stores/global-storage";

export const useLogin = () => {
  const { isLogined, setIsLogined } = globalStore();

  useEffect(() => {
    if (jwt.getToken()) {
      setIsLogined(true);
    }
  }, []);

  return {
    isLogined,
    setIsLogined,
  };
};
