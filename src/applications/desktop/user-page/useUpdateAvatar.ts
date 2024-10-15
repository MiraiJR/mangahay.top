import MeService from "@/shared/services/meService";
import { userStore } from "@/shared/stores/user-storage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateAvatar = (avatar: File | null) => {
  const { setUserProfile } = userStore();

  const validate = () => {
    if (!avatar) {
      throw new Error("Vui lòng chọn ảnh!");
    }
  };

  const mutation = useMutation({
    mutationKey: ["users.updateAvatar"],
    mutationFn: async () => {
      validate();

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        const { data } = await MeService.updateAvatar(formData);

        setUserProfile(data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Đổi avatar thành công!");
    },
  });

  return {
    avatar,
    handleUpdateAvatar: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
