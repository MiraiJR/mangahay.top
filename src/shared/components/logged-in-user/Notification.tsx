import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Bell } from "lucide-react";
import MyLoading from "../MyLoading";
import ListNotifies from "./ListNotifies";
import Link from "next/link";
import { Badge } from "primereact/badge";
import { useTranslation } from "react-i18next";
import { useNotification } from "@/shared/hooks/useNotification";
import { NotificationContextProvider } from "@/shared/contexts/NotificationContext";
import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/components/notification/enum";

export const Notification = () => {
  const { oppositeTheme, theme } = useThemeContext();
  const {
    notifyRef,
    isShowNotification,
    setIsShowNotification,
    notifications,
    isLoading,
  } = useNotification({
    page: 1,
    limit: 10,
    type: NOTIFICATION_STATUS.UNREAD,
  });
  const { t } = useTranslation();

  return (
    <NotificationContextProvider>
      <div
        className="flex items-center justify-center gap-4 mobile:hidden"
        ref={notifyRef}
      >
        <div
          title={t("notification.label", { ns: "common" })}
          className={`p-2 rounded-full bg-${oppositeTheme} relative`}
          onClick={() => setIsShowNotification(!isShowNotification)}
        >
          <Bell size={30} color={theme === "light" ? "white" : "black"} />
          <Badge
            value={notifications.length}
            className="absolute top-0 right-0 -translate-y-1/2"
          ></Badge>
        </div>
        {isShowNotification && (
          <div
            className={`rounded-sm z-10 shadow-outer-lg-${oppositeTheme}
        absolute top-[100%] right-0 flex flex-col items-center bg-${oppositeTheme} w-[400px]`}
          >
            <div className={`border-b-2 w-full bg-${theme} text-center py-2`}>
              {t("notification.list", { ns: "common" })}
            </div>
            {isLoading ? (
              <MyLoading />
            ) : (
              <ListNotifies notifies={notifications} />
            )}
            <div className="bg-blue-600 flex w-[100%] items-center justify-center py-1">
              <Link className={`text-${theme}`} href={"/me#1"}>
                {t("viewAll", { ns: "common" })}
              </Link>
            </div>
          </div>
        )}
      </div>
    </NotificationContextProvider>
  );
};
