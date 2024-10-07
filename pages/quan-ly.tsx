import ManagerPage from "@/applications/desktop/manager-page/Page";
import jwt from "@/shared/libs/jwt";
import { userStore } from "@/shared/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SearchRoute() {
  const { userProfile } = userStore();
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (!jwt.getToken()) {
      router.push("/");
      return;
    }

    const getMe = async () => {
      try {
        if (userProfile && userProfile.role !== "admin") {
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
