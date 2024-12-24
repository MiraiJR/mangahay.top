import ComicService from "@/shared/services/comicService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useGetComic = (slug: string = "", initialData?: Comic) => {
  const router = useRouter();
  let slugComic = slug;

  if (slugComic === "") {
    slugComic = router.query["slugComic"]?.toString() ?? "";
  }

  if (!slugComic || typeof slugComic !== "string") {
    return {
      comic: initialData,
    };
  }

  const {
    data: comic,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comic", { slugComic }],
    queryFn: async () => {
      const { data } = await ComicService.getComicBySlug(slugComic);
      return data;
    },
    enabled: !!slugComic,
    initialData,
  });

  return {
    comic,
    isLoading,
    error,
  };
};
