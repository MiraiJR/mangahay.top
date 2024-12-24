import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import ChapterService from "../services/chapterService";

export const useGetChapter = (slug: string = "") => {
  const router = useRouter();
  let slugChapter = slug;
  if (slugChapter === "") {
    slugChapter = router.query["slugChapter"]?.toString() ?? "";
  }

  const {
    data: chapter,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chapter", { slugChapter }],
    queryFn: async () => {
      const { data } = await ChapterService.getChapter(slugChapter);

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
