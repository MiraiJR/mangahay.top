import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import ChapterService from "../services/chapterService";

export const useGetChapter = () => {
  const router = useRouter();
  const { slugChapter = "" } = router.query;

  const {
    data: chapter,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chapter", { slugChapter }],
    queryFn: async () => {
      const { data } = await ChapterService.getChapter(slugChapter as string);

      return data;
    },
    enabled: slugChapter !== "",
  });

  return {
    chapter,
    isLoading,
    error,
  };
};
