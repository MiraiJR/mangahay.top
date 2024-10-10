import NotifyService from "@/shared/services/notifyService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useMarkAllReadNotification = () => {
  const navigation = useRouter();
  const mutation = useMutation({
    mutationKey: ["notifications.markRead"],
    mutationFn: async () => {
      await NotifyService.markAllRead();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigation.refresh();
    },
  });

  return {
    handleMarkAllReadNotification: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
