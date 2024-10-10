import LogoWeb from "@/shared/assets/logo.webp";
import { originalURL } from "@/shared/libs/config";
import { Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { keywordRelatedComic } from "./constant";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto bg-slate-200 p-5">
      <div className="flex desktop:items-center desktop:justify-around mobile:flex-col">
        <div className="flex flex-col items-center gap-5 font-medium text-lg">
          <Image
            priority
            width={0}
            height={150}
            className="h-[150px]"
            src={LogoWeb}
            alt="mangahay top"
          />
          <div className="flex gap-5">
            <Facebook size={30} />
            <Youtube size={30} />
          </div>
        </div>
        <div className="desktop:max-w-[50%]">
          <div className="font-bold text-lg mobile:text-sm">
            {t("keyword.label", { ns: "common" })}:
          </div>
          <ul className="flex flex-wrap gap-2">
            {keywordRelatedComic.map((keyword) => (
              <li className="desktop:btn-primary" key={keyword}>
                <Link
                  rel="preload"
                  hrefLang="vi"
                  href={originalURL as string}
                  className="mobile:text-sm capitalize"
                >
                  {keyword}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-around mobile:flex-col mt-2">
        <div className="text-center">
          {t("copyright.index", { ns: "common" })}
        </div>
        <div className="text-center">
          {t("copyright.contact", { ns: "common" })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
