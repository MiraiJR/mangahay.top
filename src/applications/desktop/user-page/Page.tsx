import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import themeStore from "@/shared/stores/theme-storage";
import dynamic from "next/dynamic";
import UserSettingPage from "./setting-page/Page";
import { useRouter } from "next/router";
import { useActiveTab } from "./useActiveTab";
import { TabType } from "./enum";
import { useTranslation } from "react-i18next";

const Profile = dynamic(() => import("./Profile"), { ssr: false });
const Notification = dynamic(
  () => import("./components/notification/Notification"),
  { ssr: false }
);
const ListFollowingComics = dynamic(
  () => import("./components/list-following-comics/ListFollowingComics"),
  {
    ssr: false,
  }
);

const UserPage = () => {
  const { oppositeTheme, theme } = useThemeContext();
  const router = useRouter();
  const { activeTab, setActiveTab } = useActiveTab();
  const { t } = useTranslation();

  const items: MenuItem[] = [
    {
      id: "1",
      label: t("personalInformation", { ns: "profile" }),
      command: () => {
        setActiveTab(TabType.PROFILE);
        router.replace(`${router.pathname}#${TabType.PROFILE}`);
      },
    },
    {
      id: "2",
      label: t("notification", { ns: "profile" }),
      command: () => {
        setActiveTab(TabType.NOTIFICATION);
        router.replace(`${router.pathname}#${TabType.NOTIFICATION}`);
      },
    },
    {
      id: "3",
      label: t("listFollowedComic", { ns: "profile" }),
      command: () => {
        setActiveTab(TabType.FOLLOWING_COMIC);
        router.replace(`${router.pathname}#${TabType.FOLLOWING_COMIC}`);
      },
    },
    {
      id: "4",
      label: t("setting", { ns: "profile" }),
      command: () => {
        setActiveTab(TabType.SETTING);
        router.replace(`${router.pathname}#${TabType.SETTING}`);
      },
    },
  ];

  return (
    <div>
      <div className="card w-[100%]">
        <TabMenu
          pt={{
            menu: {
              className: `bg-${theme}`,
            },
            action: {
              className: `bg-${theme}`,
            },
          }}
          model={items}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
        />
      </div>
      <div className={`bg-${themeStore.getTheme()} text-${oppositeTheme}`}>
        {activeTab === TabType.PROFILE && <Profile />}
        {activeTab === TabType.NOTIFICATION && <Notification />}
        {activeTab === TabType.FOLLOWING_COMIC && <ListFollowingComics />}
        {activeTab === TabType.SETTING && <UserSettingPage />}
      </div>
    </div>
  );
};

export default UserPage;
