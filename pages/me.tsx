import UserPage from "@/applications/desktop/user-page/Page";
import jwt from "@/shared/libs/jwt";
import MeService from "@/shared/services/meService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ForgetPasswordRoute() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!jwt.getToken()) {
      router.push("/");
      return;
    }

    const getMe = async () => {
      try {
        const { data } = await MeService.getMe();

        setIsShow(true);
        setUser(data);
      } catch (error: any) {
        router.push("/");
      }
    };

    getMe();
  }, []);
  return <>{user && isShow && <UserPage />}</>;
}
