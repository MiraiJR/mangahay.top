import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/components/notification/enum";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";
import { usePaginationState } from "./usePaginationState";
import { useState } from "react";
import MeService from "../services/meService";

export const useNotification = (
  initialType: NOTIFICATION_STATUS = NOTIFICATION_STATUS.UNREAD
) => {
  const { page, setPage, setSize, size } = usePaginationState({
    initialPage: 1,
    initialSize: 10,
  });
  const [type, setType] = useState<NOTIFICATION_STATUS>(initialType);
  const { isLoggedIn } = useAuthContext();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notification", page, size, type],
    queryFn: async () => {
      const { data } = await MeService.getNotifications({
        page,
        size,
        type,
      });

      return data;
    },
    enabled: isLoggedIn,
  });

  return {
    page,
    setPage,
    setSize,
    size,
    setType,
    type,
    ...notifications,
    isLoading,
  };
};

export type NotificationFromHook = ReturnType<typeof useNotification>;
