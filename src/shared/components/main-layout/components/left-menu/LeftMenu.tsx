import { History, Library } from "lucide-react";
import { Popover } from "antd";
import { ListGenres } from "./ListGenres";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface LeftMenuItem {
  id: number;
  isChevronDown: boolean;
  component: any;
  handle: () => void;
}

export const LeftMenu = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const leftMenuItems: LeftMenuItem[] = [
    {
      id: 1,
      isChevronDown: true,
      handle: () => {},
      component: (
        <Popover trigger={"click"} content={<ListGenres />}>
          <div className="flex gap-1">
            <Library />
            <span className="mobile:hidden">
              {t("leftMenu.genre", { ns: "common" })}
            </span>
          </div>
        </Popover>
      ),
    },
    {
      id: 3,
      isChevronDown: false,
      handle: () => {
        router.push("/lich-su");
      },
      component: (
        <div className="flex gap-1">
          <History />
          <span className="mobile:hidden">
            {t("leftMenu.history", { ns: "common" })}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex gap-4 mobile:gap-1">
      {leftMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={item.handle}
          className="flex gap-1 cursor-pointer items-center"
        >
          {item.component}
        </div>
      ))}
    </div>
  );
};
