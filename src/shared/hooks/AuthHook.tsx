import React, { ReactElement, useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import { originalURL } from "../libs/config";
import MyLoading from "../components/MyLoading";
import MeService from "../services/meService";

interface itemProps {
  component: ReactElement;
}

const useAuthHook = ({ component }: itemProps) => {
  const [tempComponent, setTempComponent] = useState<ReactElement>(
    <MyLoading />
  );

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setTempComponent(component);
      return;
    }

    const getMe = async () => {
      try {
        await MeService.getMe();
        window.location.href = `${originalURL}/`;
      } catch (error: any) {
        setTempComponent(component);
      }
    };

    getMe();
  }, []);

  return tempComponent;
};

export default useAuthHook;
