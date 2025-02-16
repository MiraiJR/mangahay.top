import { Notification } from "./Notification";
import { Avatar } from "primereact/avatar";
import { userStore } from "@/shared/stores/user-storage";
import { Popover } from "antd";
import { Menu } from "./Menu";

const LoginedUser = () => {
  const { userProfile } = userStore();

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className="relative cursor-pointer desktop:ml-10 flex gap-4 mobile:hidden">
      <Notification />
      <Popover placement="bottomRight" trigger={"click"} content={<Menu />}>
        <Avatar
          shape="square"
          pt={{
            image: {
              className:
                "mobile:w-[36px] w-[50px] mobile:h-[36px] h-[50px] object-cover rounded",
            },
          }}
          icon="pi pi-user"
          image={userProfile.avatar}
          label={userProfile.fullname[0]}
          size="large"
        />
      </Popover>
    </div>
  );
};

export default LoginedUser;
