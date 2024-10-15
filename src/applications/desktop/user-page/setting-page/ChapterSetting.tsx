import UserSettingService from "@/shared/services/settingService";
import { userStore } from "@/shared/stores/user-storage";
import { ChapterSetting } from "@/shared/types/UserSetting";
import { ChapterViewType } from "@/shared/types/enums/ChapterViewType";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface itemProps {
  currentSetting: ChapterSetting;
}
interface ChapterView {
  name: string;
  code: string;
}

const DEFAULT_CHAPTER_VIEW_SETTING: ChapterView = {
  name: "DEFAULT (Lướt từ trên xuống dưới)",
  code: `${ChapterViewType.DEFAULT}`,
};
const DEFAUL_AMOUNT_SLIDE_PER_VIEW: number = 1;

const ChapterSettingComponent = ({ currentSetting }: itemProps) => {
  const { setUserChapterSetting } = userStore();
  const [selectedChapterView, setSelectedChapterView] = useState<ChapterView>(
    DEFAULT_CHAPTER_VIEW_SETTING
  );
  const [showAmountSetting, setShowAmountSetting] = useState<boolean>(false);
  const [amountSetting, setAmountSetting] = useState<number>(
    DEFAUL_AMOUNT_SLIDE_PER_VIEW
  );
  const cities: ChapterView[] = [
    {
      name: "DEFAULT (Lướt từ trên xuống dưới)",
      code: `${ChapterViewType.DEFAULT}`,
    },
    {
      name: "LEFT TO RIGHT (Lướt từ trái sang phải)",
      code: `${ChapterViewType.SLIDER_PER_VIEW}`,
    },
  ];

  useEffect(() => {
    if (currentSetting.type === ChapterViewType.SLIDER_PER_VIEW) {
      setSelectedChapterView({
        name: "LEFT TO RIGHT (Lướt từ trái sang phải)",
        code: `${ChapterViewType.SLIDER_PER_VIEW}`,
      });
      setAmountSetting(currentSetting.amount);
    } else {
      setSelectedChapterView(DEFAULT_CHAPTER_VIEW_SETTING);
    }
  }, [currentSetting]);

  useEffect(() => {
    setShowAmountSetting(
      selectedChapterView.code === ChapterViewType.SLIDER_PER_VIEW.toString()
    );
  }, [selectedChapterView]);

  const handleUpdateChapterSetting = async () => {
    try {
      const { data } = await UserSettingService.updateChapterSetting({
        type: parseInt(selectedChapterView.code),
        amount: amountSetting,
      });

      setUserChapterSetting(data);
      toast.success("Cập nhập cài đặt thành công!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="card flex item-center gap-4 flex-wrap">
      <div className="flex items-center gap-4 flex-wrap">
        <h2>Kiểu xem</h2>
        <Dropdown
          value={selectedChapterView}
          onChange={(e: DropdownChangeEvent) => setSelectedChapterView(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Chọn kiểu xem chương"
          className="md:w-14rem"
        />
      </div>
      {showAmountSetting && (
        <div className="flex mobile:items-start items-center justify-center gap-4 flex-wrap mobile:flex-col mobile:gap-0">
          <h2>Số lượng trang truyện mỗi slide</h2>
          <InputNumber
            value={amountSetting}
            onValueChange={(e) =>
              setAmountSetting(e.value ?? DEFAUL_AMOUNT_SLIDE_PER_VIEW)
            }
            min={1}
            max={3}
          />
        </div>
      )}
      <Button label="Lưu" onClick={handleUpdateChapterSetting} />
    </div>
  );
};

export default ChapterSettingComponent;
