import LoginPage from "@/applications/desktop/auth-page/login/Page";
import useAuthHook from "@/shared/hooks/AuthHook";

export default function LoginRoute() {
  const component = useAuthHook({ component: <LoginPage /> });

  return <>{component}</>;
}
