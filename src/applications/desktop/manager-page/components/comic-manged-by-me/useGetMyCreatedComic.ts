import { useAuthContext } from "@/shared/contexts/AuthContext";
import MeService from "@/shared/services/meService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetMyCreatedComic = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const { isLoggedIn } = useAuthContext();
  const { data = { total: 0, comics: [] }, isLoading } = useQuery({
    queryKey: ["comic.myCreatedComic", { page, size }],
    queryFn: async () => {
      const { data } = await MeService.getComicsManagedByMe({ page, size });
      return data;
    },
    enabled: isLoggedIn,
  });

  return {
    totalComics: data?.total ?? 0,
    comics: data?.comics ?? [],
    setPage,
    setSize,
    page,
    size,
    isLoading,
  };
};
