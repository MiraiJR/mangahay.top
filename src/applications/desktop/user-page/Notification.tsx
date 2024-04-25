import MeService from "@/shared/services/meService";
import { useEffect, useState } from "react";
import CardNotify from "@/shared/components/card/CardNotify";
import { ProgressSpinner } from "primereact/progressspinner";
import { SelectButton } from "primereact/selectbutton";
import { Check, X } from "lucide-react";
import NotifyService from "@/shared/services/notifyService";
import { toast } from "react-toastify";
import EmptyComic from "@/shared/components/EmptyComic";

interface NotificationFilter {
  label: string;
  isRead: boolean;
}

export enum NOTIFICATION_STATUS {
  READ = "1",
  UNREAD = "0",
}

const notificationFilterButtonDatas: NotificationFilter[] = [
  {
    label: "Đã đọc",
    isRead: true,
  },
  {
    label: "Chưa đọc",
    isRead: false,
  },
];

const Notification = () => {
  const [notifies, setNotifies] = useState<Notify[] | null>(null);
  const [notificationFilterData, setNotificationFilterData] =
    useState<NotificationFilter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNotifies = async () => {
    try {
      const { data } = await MeService.getNotifies(null);

      setNotifies(data);
    } catch (error: any) {}
  };

  useEffect(() => {
    getNotifies();
  }, []);

  const filterNotification = async (isRead: boolean) => {
    setIsLoading(true);
    try {
      const { data } = await MeService.getNotifies(
        null,
        isRead ? NOTIFICATION_STATUS.READ : NOTIFICATION_STATUS.UNREAD
      );

      setNotifies(data);
      setIsLoading(false);
    } catch (error: any) {}
  };

  const markAllReadNotification = async () => {
    if (notifies?.length === 0) {
      toast.warning("Do not have any notification to mark!");
      return;
    }

    setIsLoading(true);

    try {
      setNotifies([]);
      const { data: markAllReadResult } = await NotifyService.markAllRead();
      toast.success(markAllReadResult);
      await getNotifies();

      setIsLoading(false);
    } catch (error) {}
  };

  const removeAll = async () => {
    if (notifies?.length === 0) {
      toast.warning("Do not have any notification to remove!");
      return;
    }

    setIsLoading(true);

    try {
      setNotifies([]);
      const { data } = await NotifyService.removeAll();
      toast.success(data);

      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col w-[100%]">
      <div className="pt-4 text-center font-bold text-xl">
        Danh sách thông báo
      </div>
      <div className="my-10 card flex justify-content-center items-center justify-between">
        <SelectButton
          value={notificationFilterData?.label}
          onChange={(e) => {
            setNotificationFilterData(e.value);
            filterNotification(e.value.isRead);
          }}
          options={notificationFilterButtonDatas}
        />

        <div className="flex gap-4">
          <div
            className="flex items-center text-green-600 cursor-pointer"
            onClick={markAllReadNotification}
          >
            <Check />
            <span>Đánh dấu đã đọc hết</span>
          </div>
          <div
            className="flex items-center text-red-600 cursor-pointer"
            onClick={removeAll}
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
      {notifies ? (
        notifies.length === 0 && !isLoading ? (
          <EmptyComic content="Không có thông báo" />
        ) : (
          <div className="w-[100%]">
            {notifies.map((notify) => (
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
