import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useContext, useState } from "react";
import Profile from "./Profile";
import themeStore from "@/shared/stores/themeStore";
import Notification from "./Notification";
import ListFollowingComics from "./ListFollowingComics";

interface itemProps {
  user: User;
}

interface StatusMenuNavigate {
  profile: boolean;
  notify: boolean;
  followingComics: boolean;
}

const UserPage = ({ user }: itemProps) => {
  const {} = useContext(ThemeContext);
  const [status, setStatus] = useState<StatusMenuNavigate>({
    profile: true,
    notify: false,
    followingComics: false,
  });
  const items: MenuItem[] = [
    {
      label: "Thông tin cá nhân",
      command: () => {
        setStatus({
          profile: true,
          notify: false,
          followingComics: false,
        });
      },
    },
    {
      label: "Thông báo",
      command: () => {
        setStatus({
          profile: false,
          notify: true,
          followingComics: false,
        });
      },
    },
    {
      label: "Truyện theo dõi",
      command: () => {
        setStatus({
          profile: false,
          notify: false,
          followingComics: true,
        });
      },
    },
  ];

  return (
    <div>
      <div className="card w-[100%]">
        <TabMenu model={items} />
      </div>
      <div
        className={`bg-${themeStore.getTheme()} text-${themeStore.getOppositeTheme()}`}
      >
        {status.profile && <Profile user={user} />}
        {status.notify && <Notification />}
        {status.followingComics && <ListFollowingComics />}
      </div>
    </div>
  );
};

export default UserPage;
