import { ChapterViewType } from "@/shared/types/enums/ChapterViewType";
import { InputNumber, Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { useChapterConfiguration } from "./useChapterConfiguration";
import { useConfigurationContext } from "../Context";

export const ChapterConfiguration = () => {
  const { t } = useTranslation();
  const { handleSelectType, onChangeAmount, showAmountSetting } =
    useChapterConfiguration();
  const { chapterConfiguration } = useConfigurationContext();

  const typeOptions: SelectProps["options"] = [
    {
      value: `${ChapterViewType.DEFAULT}`,
      label: t("settingPage.viewStyle.default", { ns: "profile" }),
    },
    {
      value: `${ChapterViewType.SLIDER_PER_VIEW}`,
      label: t("settingPage.viewStyle.leftToRight", { ns: "profile" }),
    },
  ];

  return (
    <div className="card flex item-center gap-4 flex-wrap">
      <div className="flex items-center gap-4 flex-wrap">
        <Select
          size={"middle"}
          defaultValue={`${chapterConfiguration.type}`}
          onChange={handleSelectType}
          style={{ width: 200 }}
          options={typeOptions}
          placeholder={t("settingPage.viewStyle.placeholder", {
            ns: "profile",
          })}
        />
      </div>
      {showAmountSetting && (
        <div className="flex mobile:items-start items-center justify-center gap-4 flex-wrap mobile:flex-col mobile:gap-0">
          <h2>
            {t("settingPage.viewStyle.theNumberOfImagePerSlide", {
              ns: "profile",
            })}
          </h2>
          <InputNumber
            min={1}
            max={3}
            value={chapterConfiguration.amountImagePerPage}
            defaultValue={1}
            onChange={onChangeAmount}
          />
        </div>
      )}
    </div>
  );
};
