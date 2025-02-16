import { useNotificationContext } from "@/shared/contexts/NotificationContext";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { t } from "i18next";
import { Bell } from "lucide-react";
import { Badge } from "primereact/badge";

export const BellNotification = () => {
  const { oppositeTheme, theme } = useThemeContext();
  const { totalUnreadNotification } = useNotificationContext();

  return (
    <div
      title={t("notification.label", { ns: "common" })}
      className={`p-2 rounded-full bg-${oppositeTheme} relative`}
    >
      <Bell size={35} color={theme === "light" ? "white" : "black"} />
      <Badge
        value={totalUnreadNotification}
        className="absolute top-0 right-0 -translate-y-1/2"
      />
    </div>
  );
};
