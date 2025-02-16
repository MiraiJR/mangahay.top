import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ComicService from "../services/comicService";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const useSearchManagedComics = () => {
  const [comicName, setComicName] = useState<string>("");
  const { isLoggedIn } = useAuthContext();
  const { data, isLoading, error } = useQuery({
    queryKey: ["comics.search.managed_comic", { name: comicName }],
    queryFn: async () => {
      const { data } = await ComicService.searchManagedComics({
        name: comicName,
      });
      return data;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return {
    comicName,
    setComicName,
    comics: data?.comics ?? [],
    listResultComicNameAndId:
      data?.comics.map((comic) => {
        return {
          value: `${comic.id}/${comic.name}`,
        };
      }) ?? [],
    isLoading,
  };
};
