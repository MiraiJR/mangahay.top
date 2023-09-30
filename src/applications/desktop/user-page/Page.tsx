import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useContext, useState } from "react";
import themeStore from "@/shared/stores/themeStore";
import dynamic from "next/dynamic";

interface itemProps {
  user: User;
}

interface StatusMenuNavigate {
  profile: boolean;
  notify: boolean;
  followingComics: boolean;
}

const Profile = dynamic(() => import("./Profile"));
const Notification = dynamic(() => import("./Notification"));
const ListFollowingComics = dynamic(() => import("./ListFollowingComics"));

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
