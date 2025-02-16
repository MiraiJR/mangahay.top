import { AdminFeature } from "./AdminFeature";
import { LoggoutButton } from "./LogoutButton";
import { ViewerFeature } from "./ViewerFeature";

export const Menu = () => {
  return (
    <div className="z-10 flex flex-col">
      <ViewerFeature />
      <AdminFeature />
      <LoggoutButton />
    </div>
  );
};
