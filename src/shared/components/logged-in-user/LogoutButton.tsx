import { useTranslation } from "react-i18next";
import { useLogout } from "./useLogout";

export const LoggoutButton = () => {
  const { handleLogout } = useLogout();
  const { t } = useTranslation();

  return (
    <div
      className="p-2 hover:bg-slate-400 cursor-pointer"
      onClick={() => handleLogout()}
    >
      {t("profile.features.logout", { ns: "common" })}
    </div>
  );
};
