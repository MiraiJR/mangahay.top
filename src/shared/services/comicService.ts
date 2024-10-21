import axiosClient from "../libs/axiosClient";

const ComicService = {
  getComics: (paging: Paging) =>
    axiosClient.get<PagingComic>(`/comics`, {
      params: paging,
    }),
  getRankingComics: (field: string, limit: number) =>
    axiosClient.get<PagingComic>(`/comics/ranking`, {
      params: {
        field,
        limit,
      },
    }),
  searchComics: (query: QuerySearch) =>
    axiosClient.get<PagingComic>(`/comics/search`, {
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
  crawlChapter: (
    comicId: number,
    urlPost: string,
    nameChapter: string,
    querySelector: string,
    attribute: string
  ) =>
    axiosClient.post<string>(`/comics/${comicId}/crawl-chapter`, {
      urlPost,
      nameChapter,
      querySelector,
      attribute,
    }),
  getComicsCreatedByMe: () => axiosClient.get<Comic[]>(`/comics/created-by-me`),
  createChapter: (comicId: number, formdata: FormData) =>
    axiosClient.post<string>(`/comics/${comicId}/chapters`, formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  getComicsWithChapters: () => axiosClient.get<Comic[]>(`/comics/chapters`),
  getListChapters: (comicId: number) =>
    axiosClient.get<Chapter[]>(`/comics/${comicId}/chapters`),
  getListComment: (comicId: number) =>
    axiosClient.get<UserCommentResponse[]>(`/comics/${comicId}/comments`),
};
export default ComicService;
