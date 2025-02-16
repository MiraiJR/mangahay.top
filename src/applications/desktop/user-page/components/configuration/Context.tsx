import { useAuthContext } from "@/shared/contexts/AuthContext";
import { ChapterViewType } from "@/shared/types/enums/ChapterViewType";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ChapterConfiguration {
  type: ChapterViewType;
  amountImagePerPage: number;
}

export interface NotificationConfiguration {
  mention: boolean;
}

interface ContextProps {
  chapterConfiguration: ChapterConfiguration;
  setChapterConfiguration: Dispatch<SetStateAction<ChapterConfiguration>>;
  notificationConfiguration: NotificationConfiguration;
  setNotificationConfiguration: Dispatch<
    SetStateAction<NotificationConfiguration>
  >;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ConfigurationProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { loggedInUser } = useAuthContext();
  const isTypeSlide =
    loggedInUser?.setting.chapter.type === ChapterViewType.SLIDER_PER_VIEW;
  const [chapterConfiguration, setChapterConfiguration] =
    useState<ChapterConfiguration>({
      type: loggedInUser?.setting.chapter.type ?? ChapterViewType.DEFAULT,
      amountImagePerPage: isTypeSlide
        ? loggedInUser?.setting.chapter.amount
        : 1,
    });
  const [notificationConfiguration, setNotificationConfiguration] =
    useState<NotificationConfiguration>({
      mention: loggedInUser?.setting.notification.mention ?? false,
    });

  useEffect(() => {
    if (loggedInUser?.setting.chapter) {
      setChapterConfiguration({
        type: loggedInUser.setting.chapter.type,
        amountImagePerPage: loggedInUser.setting.chapter.amount ?? 1,
      });
    }
  }, [loggedInUser]);

  return (
    <Context.Provider
      value={{
        notificationConfiguration,
        setNotificationConfiguration,
        chapterConfiguration,
        setChapterConfiguration,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useConfigurationContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("usePageContext must be used within PageProvider");
  }

  return context;
};
