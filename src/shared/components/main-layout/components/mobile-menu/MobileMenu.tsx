import { AdminFeature } from "@/shared/components/logged-in-user/AdminFeature";
import { LoggoutButton } from "@/shared/components/logged-in-user/LogoutButton";
import { ViewerFeature } from "@/shared/components/logged-in-user/ViewerFeature";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { Drawer } from "antd";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { FlagCountries } from "../flag-country/FlagCountries";
import { SwitchTheme } from "../SwitchTheme";
import { MinimumUser } from "@/shared/components/MinimumUser";
import { useRouter } from "next/router";

export const MobileMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  const { isLoggedIn, loggedInUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [router]);

  return (
    <>
      <div
        className="bg-black p-2 rounded-sm desktop:hidden"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Menu color="white" size={20} />
      </div>
      <Drawer
        title={
          isLoggedIn && loggedInUser && <MinimumUser user={loggedInUser} />
        }
        placement={"right"}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-row w-fit gap-2 items-center justify-center px-2">
          <FlagCountries />
          <SwitchTheme />
        </div>
        {isLoggedIn && (
          <>
            <ViewerFeature />
            <AdminFeature />
            <LoggoutButton />
          </>
        )}
      </Drawer>
    </>
  );
};
