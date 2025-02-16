import axiosClient from "../libs/axiosClient";

interface GetRankingComics {
  field: string;
  page?: number;
  size?: number;
}

const ComicService = {
  getComics: (paging: Paging) =>
    axiosClient.get<PagingComic>(`/comics`, {
      params: paging,
    }),
  getRankingComics: (query: GetRankingComics) =>
    axiosClient.get<PagingComic>(`/comics/ranking`, {
      params: {
        ...query,
      },
    }),
  searchComics: (query: QuerySearch) =>
    axiosClient.get<SearchComicResult>(`/search/comics`, {
      params: {
        ...query,
      },
    }),
  searchManagedComics: (query: SeachComicByName) =>
    axiosClient.get<SearchComicResult>(`/search/managed-comics`, {
      params: {
        ...query,
      },
    }),
  getComicBySlug: (slug: string) => axiosClient.get<Comic>(`/comics/${slug}`),
  increaseView: (comicId: number) =>
    axiosClient.patch<string>(`/comics/${comicId}/viewed`),
  commentOnComic: (comicId: number, content: string) =>
    axiosClient.post<UserCommentResponse>(`/comics/${comicId}/comments`, {
      content,
    }),
  getChapterOfComic: (comicId: number, chapterId: number) =>
    axiosClient.get<DetailChapter>(`/comics/${comicId}/chapters/${chapterId}`),
  evaluateComic: (comicId: number, score: number) =>
    axiosClient.patch<string>(`/comics/${comicId}/evaluate`, {
      score,
    }),
  getGenres: () => axiosClient.get<Genre[]>(`/genres`),
  createComic: (formData: FormData) =>
    axiosClient.post<Comic>(`/comics`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  updateComic: (comicId: number, formData: FormData) =>
    axiosClient.put<Comic>(`/comics/${comicId}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  deleteComic: (comicId: number) =>
    axiosClient.delete<string>(`/comics/${comicId}`),
  getComicsWithChapters: () => axiosClient.get<Comic[]>(`/comics/chapters`),
  getListChapters: (
    comicId: number,
    paging?: { page: number; size: number },
    isGetAll: boolean = false
  ) =>
    axiosClient.get<{ total: number; chapters: Chapter[] }>(
      `/comics/${comicId}/chapters`,
      {
        params: {
          ...paging,
          isGetAll,
        },
      }
    ),
  getListComment: (comicId: number, page: number, size: number) =>
    axiosClient.get<{
      comments: UserCommentResponse[];
      hasPrevious: boolean;
      total: number;
    }>(`/comics/${comicId}/comments`, {
      params: {
        page,
        size,
      },
    }),
  getListPrivilege: (comicId: number) =>
    axiosClient.get<ComicPrivilege[]>(`/comics/${comicId}/privileges`),
  updateSingleUserRight: (
    comicId: number,
    userId: number,
    permissions: number[]
  ) =>
    axiosClient.put<string>(`/comics/${comicId}/privileges`, {
      userId,
      permissions,
    }),
  deleteSingleUserRight: (comicId: number, privilegeId: number) =>
    axiosClient.delete<string>(`/comics/${comicId}/privileges/${privilegeId}`),
};
export default ComicService;
