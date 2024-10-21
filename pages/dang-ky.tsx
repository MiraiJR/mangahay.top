import RegisterPage from "@/applications/desktop/auth-page/childrens/register/Page";
import useAuthHook from "@/shared/hooks/useAuthHook";

export default function RegisterRoute() {
  const { component } = useAuthHook(<RegisterPage />);

  return <>{component}</>;
}
