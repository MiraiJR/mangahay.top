import { userStore } from "@/shared/stores/userStore";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const AdminFeature = () => {
  const { userProfile } = userStore();
  const { t } = useTranslation();

  const adminFeature = [
    {
      href: "/quan-ly#1",
      text: t("adminFeature.publishComic", { ns: "common" }),
    },
    {
      href: "/quan-ly#2",
      text: t("adminFeature.publishChapter", { ns: "common" }),
    },
    {
      href: "/quan-ly#3",
      text: t("adminFeature.crawlChapter", { ns: "common" }),
    },
  ];

  if (userProfile?.role !== "admin") {
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
