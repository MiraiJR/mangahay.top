import ManagerPage from "@/applications/desktop/manager-page/Page";
import jwt from "@/shared/libs/jwt";
import MeService from "@/shared/services/meService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SearchRoute() {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (!jwt.getToken()) {
      router.push("/");
      return;
    }

    const getMe = async () => {
      try {
        const { data } = await MeService.getMe();

        if (data.role !== "admin") {
          router.push("/");
          return;
        }

        setIsShow(true);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getMe();
  }, []);
  return <>{isShow && <ManagerPage />}</>;
}
