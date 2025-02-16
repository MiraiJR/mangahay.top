import { useAuthContext } from "@/shared/contexts/AuthContext";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export interface FeatureItem {
  href: string;
  text: string;
}

export const AdminFeature = () => {
  const { isAdminOrTranslator } = useAuthContext();
  const { t } = useTranslation();

  const features: FeatureItem[] = [
    {
      href: "/quan-ly",
      text: "Quản lý truyện",
    },
    {
      href: "/quan-ly",
      text: "Nhóm dịch",
    },
  ];

  if (!isAdminOrTranslator) {
    return <></>;
  }

  return (
    <div className="flex flex-col">
      {features.map((feature, index) => (
        <Link
          key={index}
          rel="preload"
          href={feature.href}
          className="p-2 hover:bg-slate-400 !text-black"
          hrefLang="vi"
        >
          {feature.text}
        </Link>
      ))}
    </div>
  );
};
