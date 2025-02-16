import UserPage from "@/applications/desktop/user-page/Page";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function MeRoute() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    router.push("/");
  }

  return <UserPage />;
}
