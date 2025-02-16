import { emailValidation } from "@/shared/helpers/validator";
import AuthService from "@/shared/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const { t } = useTranslation();
  const [titleButton, setTitleButton] = useState<string>(
    t("forgetPassword.forgetPassword", { ns: "auth" })
  );

  const validate = () => {
    if (email.trim() === "") {
      throw new Error(t("forgetPassword.emptyEmail", { ns: "auth" }));
    }

    if (!emailValidation(email)) {
      throw new Error(t("forgetPassword.wrongStructureEmail", { ns: "auth" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["forgetPassword"],
    mutationFn: async () => {
      validate();
      const { data } = await AuthService.forgetPassword(email);

      return data;
    },
    onSuccess: (message) => {
      setTitleButton(t("forgetPassword.resend", { ns: "auth" }));
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    email,
    setEmail,
    titleButton,
    handleForgetPassword: mutation.mutate,
    error: mutation.error,
    isLoading: mutation.isPending,
  };
};
