import { useNotification } from "@/shared/hooks/useNotification";
import { useRemoveAllNotification } from "./useRemoveAllNotification";
import { Check, X } from "lucide-react";
import { useMarkAllReadNotification } from "./useMarkAllReadNotification";
import { NotificationContextProvider } from "@/shared/contexts/NotificationContext";
import { useTranslation } from "react-i18next";
import { Avatar, Button, List, Popover, Switch } from "antd";
import { formatDate } from "@/shared/helpers/formatter";
import { NOTIFICATION_STATUS } from "./enum";
import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

const Notification = () => {
  const { t } = useTranslation();
  const {
    total,
    data: notifications,
    isLoading,
    setType,
    size,
    setPage,
    setSize,
    page,
    type,
  } = useNotification(NOTIFICATION_STATUS.UNREAD);
  const { handleRemoveAllNotification } = useRemoveAllNotification();
  const { handleMarkAllReadNotification } = useMarkAllReadNotification();
  const [isOpenMoreButton, setIsOpenMoreButton] = useState<boolean>(false);

  const handleChangeType = (checked: boolean) => {
    setPage(1);
    setType(checked ? NOTIFICATION_STATUS.READ : NOTIFICATION_STATUS.UNREAD);
  };

  const moreMenuTemplate = () => {
    return (
      <div className="flex gap-1 flex-col">
        {type === NOTIFICATION_STATUS.UNREAD && (
          <div
            className="flex items-center p-2 text-green-600 cursor-pointer hover:bg-slate-300"
            onClick={() => handleMarkAllReadNotification()}
          >
            <Check />
            <span>
              {t("notificationPage.markAllReadButton", { ns: "profile" })}
            </span>
          </div>
        )}
        <div
          className="flex items-center p-2 text-red-600 cursor-pointer hover:bg-slate-300"
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
    );
  };

  return (
    <NotificationContextProvider>
      <div className="flex flex-col w-[100%] mobile:text-xs">
        <div className="my-10 card flex justify-content-center items-center justify-between">
          <Switch
            checkedChildren={t("notificationPage.type.read", { ns: "profile" })}
            unCheckedChildren={t("notificationPage.type.unread", {
              ns: "profile",
            })}
            onChange={handleChangeType}
            defaultValue={false}
          />

          <Popover
            content={moreMenuTemplate()}
            trigger="click"
            placement="leftTop"
            open={isOpenMoreButton}
            onOpenChange={() => {
              setIsOpenMoreButton(!isOpenMoreButton);
            }}
          >
            <Button icon={<MoreOutlined />} />
          </Popover>
        </div>
        <List
          loading={isLoading}
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item>
              <List.Item.Meta
                className={`${
                  type === NOTIFICATION_STATUS.READ ? "bg-slate-300" : ""
                } p-2 rounded-sm`}
                avatar={
                  <Avatar src={notification.thumb} alt="notification image" />
                }
                title={
                  <a
                    href={notification.redirectUrl}
                    dangerouslySetInnerHTML={{ __html: notification.title }}
                  />
                }
                description={
                  <div className="flex flex-row justify-between">
                    <span
                      dangerouslySetInnerHTML={{ __html: notification.body }}
                    />
                    <span>{formatDate(notification.createdAt)}</span>
                  </div>
                }
              />
            </List.Item>
          )}
          pagination={{
            total: total,
            pageSize: size,
            current: page,
            onChange(page, pageSize) {
              setPage(page);
              setSize(pageSize);
            },
          }}
        />
      </div>
    </NotificationContextProvider>
  );
};

export default Notification;
