import AuthService from "@/shared/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const router = useRouter();
  const { t } = useTranslation();

  const validate = () => {
    if (
      email.trim() === "" ||
      confirmPassword.trim() === "" ||
      fullname.trim() === "" ||
      password.trim() === ""
    ) {
      throw new Error(t("validation.emptyInput", { ns: "auth" }));
    }

    if (confirmPassword !== password) {
      throw new Error(
        t("validation.notMatchedConfirmPassowrd", { ns: "auth" })
      );
    }
  };

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async () => {
      validate();

      const { data } = await AuthService.register({
        password,
        email,
        fullname,
      });

      toast.success(data);
      router.push("/dang-nhap");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return {
    errorMessage,
    password,
    setPassword,
    email,
    setEmail,
    confirmPassword,
    setConfirmPassword,
    fullname,
    setFullname,
    handleRegister: mutation.mutate,
  };
};
