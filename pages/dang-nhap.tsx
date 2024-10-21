import LoginPage from "@/applications/desktop/auth-page/childrens/login/Page";
import useAuthHook from "@/shared/hooks/useAuthHook";

export default function LoginRoute() {
  const { component } = useAuthHook(<LoginPage />);

  return <>{component}</>;
}
