import React, { createContext, useContext, ReactNode } from "react";
import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/components/notification/enum";
import { useQueryClient } from "@tanstack/react-query";

interface NotificationContextProps {
  refetchNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const queryClient = useQueryClient();

  const refetchNotification = () => {
    queryClient.invalidateQueries({
      queryKey: [
        "notification",
        { page: 1, limit: 10, type: NOTIFICATION_STATUS.UNREAD },
      ],
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        refetchNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("Context not found");
  }
  return context;
};
