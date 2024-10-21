import React, { ReactElement, useEffect, useState } from "react";
import MyLoading from "../components/MyLoading";
import MeService from "../services/meService";
import { useQuery } from "@tanstack/react-query";
import { originalURL } from "../libs/config";

const useAuthHook = (targetComponent: ReactElement) => {
  const [component, setComponent] = useState<ReactElement>(MyLoading);
  const { isSuccess } = useQuery({
    queryKey: ["auth.getMe"],
    queryFn: async () => {
      const { data } = await MeService.getMe();

      return data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      window.location.href = `${originalURL}`;
    } else {
      setComponent(targetComponent);
    }
  }, [isSuccess]);

  return { component };
};

export default useAuthHook;
