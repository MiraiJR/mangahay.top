import { useAuthContext } from "@/shared/contexts/AuthContext";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface FeatureItem {
  href: string;
  text: string;
  isHiden: boolean;
}

export const ViewerFeature = () => {
  const { isAdminOrTranslator } = useAuthContext();
  const { t } = useTranslation();

  const features: FeatureItem[] = [
    {
      href: "/me",
      text: t("profile.personalInformation", { ns: "common" }),
      isHiden: false,
    },
    {
      href: "/yeu-cau",
      text: "Yêu cầu",
      isHiden: isAdminOrTranslator,
    },
    {
      href: "/me?tab=2",
      text: "Thông báo",
      isHiden: false,
    },
  ];

  return (
    <div className="flex flex-col">
      {features.map(
        (feature, index) =>
          !feature.isHiden && (
            <Link
              key={index}
              rel="preload"
              href={feature.href}
              className="p-2 hover:bg-slate-400 !text-black"
              hrefLang="vi"
            >
              {feature.text}
            </Link>
          )
      )}
    </div>
  );
};
