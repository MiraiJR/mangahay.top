import LoginPage from "@/applications/desktop/auth-page/childrens/login/Page";
import useAuthHook from "@/shared/hooks/AuthHook";

export default function LoginRoute() {
  const component = useAuthHook({ component: <LoginPage /> });

  return <>{component}</>;
}
