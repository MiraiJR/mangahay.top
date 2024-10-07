import jwt from "@/shared/libs/jwt";
import AuthService from "@/shared/services/authService";
import { globalStore } from "@/shared/stores/globalStore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useLogout = () => {
  const { setIsLogined } = globalStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data } = await AuthService.logout();

      jwt.deleteToken();
      setIsLogined(false);
      toast.success(data);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return {
    handleLogout,
  };
};
