import { useGetListChapter } from "@/shared/hooks/useGetListChapter";
import { useGetListPrivilege } from "../privilege-comic/useGetListPrivilege";
import { userStore } from "@/shared/stores/user-storage";

export const useTableChapterState = (comicId: number) => {
  const {
    chapters,
    isLoading,
    totalChapters,
    setPage: setPageGetChapters,
    setSize: setSizeGetChapters,
    size: sizeGetChapters,
    page: pageGetChapters,
  } = useGetListChapter(comicId);
  const { privileges } = useGetListPrivilege(comicId);
  const { userProfile } = userStore();

  return {
    isLoading,
    totalChapters,
    chapters,
    permissions:
      privileges.find((privilege) => privilege.user.id === userProfile?.id)
        ?.permissions ?? [],
    setPageGetChapters,
    setSizeGetChapters,
    sizeGetChapters,
    pageGetChapters,
  };
};
