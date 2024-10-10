import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/components/notification/enum";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import MeService from "@/shared/services/meService";
import { useQuery } from "@tanstack/react-query";

interface UseNotificationParams {
  page: number;
  limit: number;
  type?: NOTIFICATION_STATUS;
}

export const useNotification = ({
  page = 1,
  limit = Number.MAX_VALUE,
  type = NOTIFICATION_STATUS.UNREAD,
}: UseNotificationParams) => {
  const {
    elementRef: notifyRef,
    isVisiable: isShowNotification,
    setIsVisiable: setIsShowNotification,
  } = useClickOutside();
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notification", { page, limit }, type],
    queryFn: async () => {
      try {
        const { data } = await MeService.getNotifies(
          {
            page,
            limit,
          },
          type
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
