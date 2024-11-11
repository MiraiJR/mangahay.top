import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/components/notification/enum";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";
import NotifyService from "../services/notifyService";

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
  const { isLoggedIn } = useAuthContext();

  const {
    elementRef: notifyRef,
    isVisiable: isShowNotification,
    setIsVisiable: setIsShowNotification,
  } = useClickOutside();
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notification", { page, limit, type }],
    queryFn: async () => {
      const { data } = await NotifyService.getMyNotification(
        {
          page,
          limit,
        },
        type
      );

      return data;
    },
    enabled: isLoggedIn,
  });

  return {
    notifyRef,
    isShowNotification,
    setIsShowNotification,
    notifications,
    isLoading,
  };
};
