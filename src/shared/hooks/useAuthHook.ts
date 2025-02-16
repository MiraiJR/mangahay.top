import { ReactElement, useEffect, useState } from "react";
import MyLoading from "../components/base-components/loading/MyLoading";
import { originalURL } from "../libs/config";
import { useAuthContext } from "../contexts/AuthContext";

const useAuthHook = (targetComponent: ReactElement) => {
  const [component, setComponent] = useState<ReactElement>(MyLoading);
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = `${originalURL}`;
    } else {
      setComponent(targetComponent);
    }
  }, [isLoggedIn, setComponent]);

  return { component };
};

export default useAuthHook;
