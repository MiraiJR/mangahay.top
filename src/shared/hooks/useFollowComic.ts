import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MeService, { TypeComicInteraction } from "../services/meService";

export const useFollowComic = () => {
  const mutation = useMutation({
    mutationKey: ["comic.follow"],
    mutationFn: async ({
      comicId,
      isFollowed,
    }: {
      comicId: number;
      isFollowed: boolean;
    }) => {
      await MeService.interactWithComic(
        comicId,
        isFollowed ? TypeComicInteraction.follow : TypeComicInteraction.unfollow
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    handleFollow: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
