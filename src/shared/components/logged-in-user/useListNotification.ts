import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/components/notification/enum";
import { useGetNotifications } from "./useGetNotifications";

export const useListNotification = () => {
  const notifications = useGetNotifications({
    type: NOTIFICATION_STATUS.UNREAD,
  });

  const loadMore = async () => {
    const result = await notifications.fetchNextPage();

    return result;
  };

  return {
    isLoading: notifications.isLoading,
    notifications: notifications.items,
    total: notifications.total,
    loadMore,
  };
};
