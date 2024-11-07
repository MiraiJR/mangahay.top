import { useAuthContext } from "@/shared/contexts/AuthContext";
import jwt from "@/shared/libs/jwt";
import AuthService from "@/shared/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useLogout = () => {
  const { setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["user.logout"],
    mutationFn: async () => {
      const { data } = await AuthService.logout();

      jwt.deleteToken();
      setIsLoggedIn(false);
      router.reload();
      return data;
    },
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    handleLogout: mutation.mutate,
  };
};
