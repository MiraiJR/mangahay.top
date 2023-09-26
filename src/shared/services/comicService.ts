import axiosClient from "../libs/axiosClient";

const ComicService = {
  getComics: (paging: Paging) =>
    axiosClient.get<PagingComicsResponse>(`/comics`, {
      params: paging,
    }),
  getRankingComics: (field: string, limit: number) =>
    axiosClient.get<Comic[]>(`/comics/ranking`, {
      params: {
        field,
        limit,
      },
    }),
  searchComics: (query: QuerySearch) =>
    axiosClient.get<PagingComicsResponse>(`/comics/search`, {
      params: {
        ...query,
      },
    }),
  getComicBySlug: (slug: string) =>
    axiosClient.get<ComicDetail>(`/comics/${slug}`),
  increaseField: (comicId: number, field: string, jump: number) =>
    axiosClient.patch<string>(
      `/comics/${comicId}/increment?field=${field}&jump=${jump}`
    ),

  commentOnComic: (comicId: number, content: string) =>
    axiosClient.post<UserComment>(`/comics/${comicId}/comments`, {
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
  crawlChapterOnFacebook: (
    comicId: number,
    urlPost: string,
    nameChapter: string
  ) =>
    axiosClient.post<string>(`/comics/${comicId}/crawl-comic`, {
      urlPost,
      nameChapter,
    }),
  getComicsCreatedByMe: () => axiosClient.get<Comic[]>(`/comics/created-by-me`),
  createChapter: (comicId: number, formdata: FormData) =>
    axiosClient.post<string>(`/comics/${comicId}/chapters`, formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  getComicsWithChapters: () => axiosClient.get<Comic[]>(`/comics/chapters`),
  getCrawlImages: (urlPost: string) =>
    axiosClient.post<string[]>(`/comics/crawl-images`, {
      urlPost,
    }),
};
export default ComicService;
