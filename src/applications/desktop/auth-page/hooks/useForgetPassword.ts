import { emailValidation } from "@/shared/helpers/Validation";
import i18n from "@/shared/libs/i18n";
import AuthService from "@/shared/services/authService";
import { useState } from "react";
import { toast } from "react-toastify";

export const useForgetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [titleButton, setTitleButton] = useState<string>(
    i18n.t("forgetPassword.forgetPassword", { ns: "auth" })
  );

  const handleForgetPassword = async () => {
    if (email.trim() === "") {
      setErrorMessage(i18n.t("forgetPassword.emptyEmail", { ns: "auth" }));
      return;
    }

    if (!emailValidation(email)) {
      setErrorMessage(
        i18n.t("forgetPassword.wrongStructureEmail", { ns: "auth" })
      );
      return;
    }

    setErrorMessage("");

    try {
      const { data } = await AuthService.forgetPassword(email);
      toast.success(data);
      setTitleButton(i18n.t("forgetPassword.resend", { ns: "auth" }));
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
