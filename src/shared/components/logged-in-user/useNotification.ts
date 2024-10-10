import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/Notification";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import MeService from "@/shared/services/meService";
import { useQuery } from "@tanstack/react-query";

export const useNotification = () => {
  const {
    elementRef: notifyRef,
    isVisiable: isShowNotification,
    setIsVisiable: setIsShowNotification,
  } = useClickOutside();
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: [
      "notification",
      { page: 1, limit: 10 },
      NOTIFICATION_STATUS.UNREAD,
    ],
    queryFn: async () => {
      try {
        const { data } = await MeService.getNotifies(
          {
            page: 1,
            limit: 10,
          },
          NOTIFICATION_STATUS.UNREAD
        );

        return data;
      } catch (error: any) {}
    },
  });

  return {
    notifyRef,
    isShowNotification,
    setIsShowNotification,
    notifications,
    isLoading,
  };
};
