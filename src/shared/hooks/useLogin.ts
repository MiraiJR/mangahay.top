import { useEffect } from "react";
import jwt from "../libs/jwt";
import { globalStore } from "../stores/globalStore";

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
