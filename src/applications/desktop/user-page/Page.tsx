import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useContext } from "react";
import themeStore from "@/shared/stores/theme-storage";
import dynamic from "next/dynamic";
import UserSettingPage from "./setting-page/Page";
import { useRouter } from "next/router";
import { useActiveTab } from "./useActiveTab";
import { TabType } from "./enum";

const Profile = dynamic(() => import("./Profile"));
const Notification = dynamic(
  () => import("./components/notification/Notification")
);
const ListFollowingComics = dynamic(() => import("./ListFollowingComics"));

const UserPage = () => {
  const { oppositeTheme } = useContext(ThemeContext);
  const router = useRouter();
  const { activeTab, setActiveTab } = useActiveTab();

  const items: MenuItem[] = [
    {
      label: "Thông tin cá nhân",
      command: () => {
        setActiveTab(TabType.PROFILE);
        router.replace(`${router.pathname}#${TabType.PROFILE}`);
      },
    },
    {
      label: "Thông báo",
      command: () => {
        setActiveTab(TabType.NOTIFICATION);
        router.replace(`${router.pathname}#${TabType.NOTIFICATION}`);
      },
    },
    {
      label: "Truyện theo dõi",
      command: () => {
        setActiveTab(TabType.FOLLOWING_COMIC);
        router.replace(`${router.pathname}#${TabType.FOLLOWING_COMIC}`);
      },
    },
    {
      label: "Cài đặt",
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
