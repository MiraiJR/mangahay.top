import { emailValidation } from "@/shared/helpers/Validation";
import AuthService from "@/shared/services/authService";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useForgetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { t } = useTranslation();
  const [titleButton, setTitleButton] = useState<string>(
    t("forgetPassword.forgetPassword", { ns: "auth" })
  );

  const handleForgetPassword = async () => {
    if (email.trim() === "") {
      setErrorMessage(t("forgetPassword.emptyEmail", { ns: "auth" }));
      return;
    }

    if (!emailValidation(email)) {
      setErrorMessage(t("forgetPassword.wrongStructureEmail", { ns: "auth" }));
      return;
    }

    setErrorMessage("");

    try {
      const { data } = await AuthService.forgetPassword(email);
      toast.success(data);
      setTitleButton(t("forgetPassword.resend", { ns: "auth" }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    email,
    setEmail,
    errorMessage,
    titleButton,
    handleForgetPassword,
  };
};
