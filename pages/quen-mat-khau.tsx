import ForgetPasswordPage from "@/applications/desktop/auth-page/childrens/forget-password/Page";
import useAuthHook from "@/shared/hooks/AuthHook";

export default function ForgetPasswordRoute() {
  const component = useAuthHook({ component: <ForgetPasswordPage /> });

  return <>{component}</>;
}
