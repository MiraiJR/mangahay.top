import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { ListNotification } from "./ListNotification";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { NotificationContextProvider } from "@/shared/contexts/NotificationContext";
import { Popover } from "antd";
import { BellNotification } from "./BellNotification";

export const Notification = () => {
  const { oppositeTheme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <NotificationContextProvider>
      <Popover
        className="mobile:hidden"
        overlayInnerStyle={{ width: "400px" }}
        placement="bottomRight"
        trigger={"click"}
        content={
          <div>
            <ListNotification />
            <div className="border-t border-t-slate-200 flex w-[100%] items-center justify-center">
              <Link
                className={`text-${oppositeTheme} pt-[12px]`}
                href={"/me?tab=2"}
              >
                {t("viewAll", { ns: "common" })}
              </Link>
            </div>
          </div>
        }
        title={
          <div className={`text-center border-b border-b-slate-200`}>
            {t("notification.list", { ns: "common" })}
          </div>
        }
      >
        <div>
          <BellNotification />
        </div>
      </Popover>
    </NotificationContextProvider>
  );
};
