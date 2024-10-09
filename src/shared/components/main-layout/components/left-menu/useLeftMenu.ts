import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { Library, History, LucideIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type ItemLeftMenu = {
  id: number;
  label: string;
  isChevronDown: boolean;
  handle: any;
  Icon?: LucideIcon;
};

export const useLeftMenu = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showListGenres, setShowListGenres] = useState<boolean>(false);
  const { elementRef: genreRef } = useClickOutside(setShowListGenres);
  const leftMenu: ItemLeftMenu[] = [
    {
      id: 1,
      label: t("leftMenu.genre", { ns: "common" }),
      isChevronDown: true,
      handle: () => {
        setShowListGenres(!showListGenres);
      },
      Icon: Library,
    },
    {
      id: 2,
      label: t("leftMenu.rank", { ns: "common" }),
      isChevronDown: false,
      handle: () => {},
    },
    {
      id: 3,
      label: t("leftMenu.history", { ns: "common" }),
      isChevronDown: false,
      handle: () => {
        router.push("/lich-su");
      },
      Icon: History,
    },
  ];

  return {
    leftMenuData: leftMenu,
    genreRef,
    showListGenres,
  };
};