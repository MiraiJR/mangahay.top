import { Checkbox, CheckboxProps } from "antd";
import { useConfigurationContext } from "../Context";

export const NotificationConfiguration = () => {
  const { notificationConfiguration, setNotificationConfiguration } =
    useConfigurationContext();

  return (
    <Checkbox
      checked={notificationConfiguration.mention}
      onChange={(event) => {
        setNotificationConfiguration((previousState) => {
          return {
            ...previousState,
            mention: event.target.checked,
          };
        });
      }}
    >
      Nhận thông báo khi được nhắc đến
    </Checkbox>
  );
};
