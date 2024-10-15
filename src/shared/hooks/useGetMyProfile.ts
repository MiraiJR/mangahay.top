import { useQuery } from "@tanstack/react-query";
import { userStore } from "../stores/user-storage";
import { toast } from "react-toastify";
import MeService from "../services/meService";

export const useGetMyProfile = () => {
  const { setUserProfile } = userStore();

  const { data: myProfile = null, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await MeService.getMe();

        setUserProfile(data);
        return data;
      } catch (error: any) {
        toast.error(error.mesage);
      }
    },
  });

  return { myProfile, isLoading };
};
