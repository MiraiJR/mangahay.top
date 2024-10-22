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

const notificationFilterButtonDatas: NotificationFilter[] = [
  {
    label: "Đã đọc",
    type: NOTIFICATION_STATUS.READ,
  },
  {
    label: "Chưa đọc",
    type: NOTIFICATION_STATUS.UNREAD,
  },
];

const Notification = () => {
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
    <div className="flex flex-col w-[100%]">
      <div className="pt-4 text-center font-bold text-xl">
        Danh sách thông báo
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
            <span>Đánh dấu đã đọc hết</span>
          </div>
          <div
            className="flex items-center text-red-600 cursor-pointer"
            onClick={() => {
              handleRemoveAllNotification();
            }}
          >
            <X />
            <span>Xoá tất cả</span>
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
  );
};

export default Notification;
