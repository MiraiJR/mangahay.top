import { Tabs, TabsProps } from "antd";
import { useTranslation } from "react-i18next";
import ListFollowingComics from "../list-following-comics/ListFollowingComics";
import Notification from "../notification/Notification";
import Profile from "../profile/Profile";
import { PersonalConfiguration } from "../configuration";
import { usePathname, useSearchParams } from "next/navigation";
import { useParams } from "@/shared/hooks/useParams";
import { useRouter } from "next/router";
import { ConfigurationProvider } from "../configuration/Context";

export const TabMenuUser = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const defaultTab = searchParams.get("tab") ?? "1";
  const { createQueryString } = useParams();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("personalInformation", { ns: "profile" }),
      children: <Profile />,
    },
    {
      key: "2",
      label: t("notification", { ns: "profile" }),
      children: <Notification />,
    },
    {
      key: "3",
      label: t("listFollowedComic", { ns: "profile" }),
      children: <ListFollowingComics />,
    },
    {
      key: "4",
      label: t("setting", { ns: "profile" }),
      children: (
        <ConfigurationProvider>
          <PersonalConfiguration />
        </ConfigurationProvider>
      ),
    },
  ];

  const onChange = (key: string) => {
    router.push(pathname + "?" + createQueryString("tab", key));
  };

  return (
    <Tabs defaultActiveKey={defaultTab} onChange={onChange} items={items} />
  );
};
