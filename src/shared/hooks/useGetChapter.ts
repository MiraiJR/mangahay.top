import { useRouter } from "next/router";
import { extractIdFromSlugChapter } from "../helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import ChapterService from "../services/chapterService";

export const useGetChapter = () => {
  const router = useRouter();
  const { slugChapter } = router.query;
  const chapterId = extractIdFromSlugChapter(slugChapter as string) ?? null;

  const {
    data: chapter,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chapter", { chapterId }],
    queryFn: async () => {
      const { data } = await ChapterService.getChapter(chapterId);

      return data;
    },
    enabled: !!chapterId,
  });

  return {
    chapter,
    isLoading,
    error,
  };
};
