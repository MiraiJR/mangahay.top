import NotifyService from "@/shared/services/notifyService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useRemoveAllNotification = () => {
  const navigation = useRouter();
  const mutation = useMutation({
    mutationKey: ["notifications.removeAll"],
    mutationFn: async () => {
      await NotifyService.removeAll();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigation.refresh();
    },
  });

  return {
    handleRemoveAllNotification: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
