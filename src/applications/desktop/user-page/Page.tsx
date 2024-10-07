import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useContext, useEffect, useState } from "react";
import themeStore from "@/shared/stores/themeStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import UserSettingPage from "./setting-page/Page";

enum TabType {
  PROFILE = 0,
  NOTIFICATION = 1,
  FOLLOWING_COMIC = 2,
  SETTING = 3,
}

const Profile = dynamic(() => import("./Profile"));
const Notification = dynamic(() => import("./Notification"));
const ListFollowingComics = dynamic(() => import("./ListFollowingComics"));

const UserPage = () => {
  const {} = useContext(ThemeContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(TabType.PROFILE);

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

  useEffect(() => {
    const tabName = router.asPath.split("#")[1] ?? TabType.PROFILE;
    const tabNameIndex = parseInt(tabName);
    setActiveTab(tabNameIndex);
  }, []);

  return (
    <div>
      <div className="card w-[100%]">
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
        />
      </div>
      <div
        className={`bg-${themeStore.getTheme()} text-${themeStore.getOppositeTheme()}`}
      >
        {activeTab === TabType.PROFILE && <Profile />}
        {activeTab === TabType.NOTIFICATION && <Notification />}
        {activeTab === TabType.FOLLOWING_COMIC && <ListFollowingComics />}
        {activeTab === TabType.SETTING && <UserSettingPage />}
      </div>
    </div>
  );
};

export default UserPage;
