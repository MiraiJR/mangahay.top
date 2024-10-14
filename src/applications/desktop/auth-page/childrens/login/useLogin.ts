import AuthService from "@/shared/services/authService";
import { globalStore } from "@/shared/stores/globalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import JWTManager from "@/shared/libs/jwt";

export const useLogin = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { t } = useTranslation();
  const router = useRouter();
  const { setIsLogined } = globalStore();

  const validate = () => {
    if (email.trim() === "") {
      throw new Error(t("validation.emptyEmail", { ns: "auth" }));
    }

    if (password.trim() === "") {
      throw new Error(t("validation.emptyPassword", { ns: "auth" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      validate();
      const { data } = await AuthService.login({
        password,
        email,
      });

      JWTManager.setToken(data);
      setIsLogined(true);
      router.push("/");
      return data;
    },
  });

  return {
    password,
    setPassword,
    email,
    setEmail,
    handleLogin: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
