import { ChapterViewType } from "@/shared/types/enums/ChapterViewType";
import { InputNumberProps } from "antd";
import { useState } from "react";
import { useConfigurationContext } from "../Context";

export const useChapterConfiguration = () => {
  const { chapterConfiguration, setChapterConfiguration } =
    useConfigurationContext();
  const isTypeSlide =
    chapterConfiguration.type === ChapterViewType.SLIDER_PER_VIEW;
  const [showAmountSetting, setShowAmountSetting] =
    useState<boolean>(isTypeSlide);

  const handleSelectType = (value: string) => {
    setChapterConfiguration((previousState) => {
      return {
        ...previousState,
        type: parseInt(value, 10),
      };
    });
    setShowAmountSetting(
      parseInt(value, 10) === ChapterViewType.SLIDER_PER_VIEW
    );
  };

  const onChangeAmount: InputNumberProps["onChange"] = (value) => {
    if (value) {
      setChapterConfiguration((previousState) => {
        return {
          ...previousState,
          amountImagePerPage: parseInt(value as string),
        };
      });
    }
  };

  return {
    handleSelectType,
    onChangeAmount,
    showAmountSetting,
  };
};
