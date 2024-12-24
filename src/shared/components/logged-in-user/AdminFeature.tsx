import { useAuthContext } from "@/shared/contexts/AuthContext";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface AdminFeatureItem {
  href: string;
  text: string;
}

export const AdminFeature = () => {
  const { isAdminOrTranslator } = useAuthContext();
  const { t } = useTranslation();

  const adminFeature: AdminFeatureItem[] = [
    {
      href: "/quan-ly",
      text: "Quản lý truyện",
    },
  ];

  if (!isAdminOrTranslator) {
    return <></>;
  }

  return (
    <div className="flex flex-col">
      {adminFeature.map((feature, index) => (
        <Link
          key={index}
          rel="preload"
          href={feature.href}
          className="p-2 hover:bg-slate-400"
          hrefLang="vi"
        >
          {feature.text}
        </Link>
      ))}
    </div>
  );
};
