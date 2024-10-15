import Image, { StaticImageData } from "next/image";
import EmptyImage from "@/shared/assets/empty.webp";
import { useTranslation } from "react-i18next";
import i18n from "../libs/i18n";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface itemProps {
  content?: string;
  image?: StaticImageData | string;
}

const EmptyComic = ({
  content = i18n.t("noComic", { ns: "common" }),
  image = EmptyImage,
}: itemProps) => {
  const { t } = useTranslation();
  const { oppositeTheme } = useContext(ThemeContext);

  return (
    <div className="text-center flex flex-col items-center justify-center w-full">
      <Image
        priority
        width={200}
        src={image}
        alt={t("noComic", { ns: "common" })}
      />
      <span className={`text-${oppositeTheme}`}>{content}</span>
    </div>
  );
};

export default EmptyComic;
