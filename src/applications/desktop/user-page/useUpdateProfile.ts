import { phoneValition } from "@/shared/helpers/Validation";
import MeService from "@/shared/services/meService";
import { userStore } from "@/shared/stores/user-storage";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export const useUpdateProfile = () => {
  const { userProfile, setUserProfile } = userStore();
  const [fullName, setFullName] = useState<string>(userProfile?.fullname ?? "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    userProfile?.phone ?? ""
  );

  const validate = () => {
    if (!userProfile) {
      throw new Error("Không thể cập nhật thông tin!");
    }

    if (fullName.trim() === "") {
      throw new Error("Tên hiển thị là bắt buộc!");
    }

    if (phoneValition(phoneNumber.trim())) {
      throw new Error("Số điện thoại không hợp lệ!");
    }
  };

  const mutation = useMutation({
    mutationKey: ["users.updateProfile"],
    mutationFn: async () => {
      validate();

      if (phoneNumber !== "") {
        const { data } = await MeService.updateProfile({
          fullname: fullName,
          phone: phoneNumber,
        });

        setUserProfile(data);
      } else {
        const { data } = await MeService.updateProfile({
          fullname: fullName,
        });
        setUserProfile(data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công!");
    },
  });

  return {
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    handleUpdateProfile: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
