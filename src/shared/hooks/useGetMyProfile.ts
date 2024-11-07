import { useQuery } from "@tanstack/react-query";
import { userStore } from "../stores/user-storage";
import MeService from "../services/meService";
import { useAuthContext } from "../contexts/AuthContext";

export const useGetMyProfile = () => {
  const { setUserProfile } = userStore();
  const { isLoggedIn } = useAuthContext();

  const {
    data: myProfile = null,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await MeService.getMe();

      setUserProfile(data);
      return data;
    },
    enabled: isLoggedIn,
  });

  return { myProfile, isLoading, isError, isSuccess };
};
