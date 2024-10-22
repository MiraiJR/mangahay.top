import { ReactElement, useEffect, useState } from "react";
import MyLoading from "../components/MyLoading";
import { originalURL } from "../libs/config";
import { useLogin } from "./useLogin";

const useAuthHook = (targetComponent: ReactElement) => {
  const [component, setComponent] = useState<ReactElement>(MyLoading);
  const { isLogined } = useLogin();

  useEffect(() => {
    if (isLogined) {
      window.location.href = `${originalURL}`;
    } else {
      setComponent(targetComponent);
    }
  }, [isLogined]);

  return { component };
};

export default useAuthHook;
