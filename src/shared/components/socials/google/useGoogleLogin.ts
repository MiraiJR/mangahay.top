import { useAuthContext } from "@/shared/contexts/AuthContext";
import jwt from "@/shared/libs/jwt";
import AuthService from "@/shared/services/authService";
import { useGoogleLogin as useGoogleLoginThirdParty } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useGoogleLogin = () => {
  const { setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["user.login.google"],
    mutationFn: async (code: string) => {
      const { data: tokens } = await AuthService.loginWithGoogle(code);

      jwt.setToken(tokens);
      setIsLoggedIn(true);
      router.back();
      return tokens;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = useGoogleLoginThirdParty({
    onSuccess: async (response) => {
      const { code } = response;
      mutation.mutate(code);
    },
    flow: "auth-code",
    select_account: true,
  });

  return {
    handleLogin,
    isLoading: mutation.isPending,
  };
};
