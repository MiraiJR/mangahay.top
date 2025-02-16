import { userStore } from "@/shared/stores/user-storage";
import { useConfigurationContext } from "./Context";
import UserSettingService from "@/shared/services/settingService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useConfiguration = () => {
  const { t } = useTranslation();
  const { setUserSetting } = userStore();
  const { chapterConfiguration, notificationConfiguration } =
    useConfigurationContext();

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      const { data } = await UserSettingService.update({
        chapter: {
          type: chapterConfiguration.type,
          amount: chapterConfiguration.amountImagePerPage,
        },
        notification: {
          mention: notificationConfiguration.mention,
        },
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setUserSetting(data);
      toast.success(t("settingPage.updateSettingSuccess", { ns: "profile" }));
    },
  });

  return {
    saveConfiguration: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
