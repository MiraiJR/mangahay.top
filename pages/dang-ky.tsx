import RegisterPage from "@/applications/desktop/auth-page/register/Page";
import useAuthHook from "@/shared/hooks/AuthHook";

export default function RegisterRoute() {
  const component = useAuthHook({ component: <RegisterPage /> });

  return <>{component}</>;
}
