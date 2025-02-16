import { Button, Descriptions, DescriptionsProps } from "antd";
import { ChapterConfiguration } from "./chapter/Chapter";
import { NotificationConfiguration } from "./notification/Notification";
import { useTranslation } from "react-i18next";
import { useConfiguration } from "./useConfiguration";

export const PersonalConfiguration = () => {
  const { t } = useTranslation();
  const { saveConfiguration, isLoading } = useConfiguration();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: t("settingPage.viewStyle.label", { ns: "profile" }),
      children: <ChapterConfiguration />,
      span: "filled",
    },
    {
      key: "2",
      label: "Thông báo",
      children: <NotificationConfiguration />,
      span: "filled",
    },
  ];

  return (
    <div className="flex gap-2">
      <div className="border border-spacing-1 w-full rounded-lg p-5">
        <Descriptions
          bordered
          items={items}
          extra={
            <Button
              loading={isLoading}
              type="primary"
              onClick={() => {
                saveConfiguration();
              }}
            >
              Lưu
            </Button>
          }
        />
      </div>
    </div>
  );
};
