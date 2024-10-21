import { useQuery } from "@tanstack/react-query";
import { userStore } from "../stores/user-storage";
import MeService from "../services/meService";

export const useGetMyProfile = () => {
  const { setUserProfile } = userStore();

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
  });

  return { myProfile, isLoading, isError, isSuccess };
};
