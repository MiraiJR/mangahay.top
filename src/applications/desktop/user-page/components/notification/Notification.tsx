import { useState } from "react";
import CardNotify from "@/shared/components/card/CardNotify";
import { ProgressSpinner } from "primereact/progressspinner";
import { SelectButton } from "primereact/selectbutton";
import EmptyComic from "@/shared/components/EmptyComic";
import { useNotification } from "@/shared/hooks/useNotification";
import { useRemoveAllNotification } from "./useRemoveAllNotification";
import { Check, X } from "lucide-react";
import { useMarkAllReadNotification } from "./useMarkAllReadNotification";
import { NOTIFICATION_STATUS } from "./enum";
import { NotificationContextProvider } from "@/shared/contexts/NotificationContext";
import { useTranslation } from "react-i18next";

const Notification = () => {
  const { t } = useTranslation();
  const notificationFilterButtonDatas: NotificationFilter[] = [
    {
      label: t("notificationPage.type.read", { ns: "profile" }),
      type: NOTIFICATION_STATUS.READ,
    },
    {
      label: t("notificationPage.type.unread", { ns: "profile" }),
      type: NOTIFICATION_STATUS.UNREAD,
    },
  ];
  const [notificationFilterData, setNotificationFilterData] =
    useState<NotificationFilter>(notificationFilterButtonDatas[0]);
  const { notifications, isLoading } = useNotification({
    page: 1,
    limit: Number.MAX_VALUE,
    type: notificationFilterData?.type,
  });
  const { handleRemoveAllNotification } = useRemoveAllNotification();
  const { handleMarkAllReadNotification } = useMarkAllReadNotification();

  return (
    <NotificationContextProvider>
      <div className="flex flex-col w-[100%]">
        <div className="pt-4 text-center font-bold text-xl">
          {t("notificationPage.list", { ns: "profile" })}
        </div>
        <div className="my-10 card flex justify-content-center items-center justify-between">
          <SelectButton
            value={notificationFilterData}
            onChange={(e) => {
              setNotificationFilterData(e.value);
            }}
            options={notificationFilterButtonDatas}
          />

          <div className="flex gap-4">
            <div
              className="flex items-center text-green-600 cursor-pointer"
              onClick={() => handleMarkAllReadNotification()}
            >
              <Check />
              <span>
                {t("notificationPage.markAllReadButton", { ns: "profile" })}
              </span>
            </div>
            <div
              className="flex items-center text-red-600 cursor-pointer"
              onClick={() => {
                handleRemoveAllNotification();
              }}
            >
              <X />
              <span>
                {t("notificationPage.removeAllButton", { ns: "profile" })}
              </span>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center w-[100%] col-span-12">
            <ProgressSpinner
              style={{ width: "100px", height: "100px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        )}
        {notifications ? (
          notifications.length === 0 && !isLoading ? (
            <EmptyComic content="Không có thông báo" />
          ) : (
            <div className="w-[100%]">
              {notifications.map((notify) => (
                <CardNotify notify={notify} imageHeight={150} key={notify.id} />
              ))}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center w-[100%] col-span-12">
            <ProgressSpinner
              style={{ width: "100px", height: "100px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        )}
      </div>
    </NotificationContextProvider>
  );
};

export default Notification;
