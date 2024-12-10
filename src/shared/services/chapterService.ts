import axiosClient from "../libs/axiosClient";

const PREFIX_API = "chapters";

const ChapterService = {
  getChapter: (slug: string) =>
    axiosClient.get<Chapter>(`/${PREFIX_API}/${slug}`),
  createChapter: (formdata: FormData) =>
    axiosClient.post<string>(`/${PREFIX_API}`, formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  crawlSingleChapter: (
    comicId: number,
    urlPost: string,
    nameChapter: string,
    querySelector: string,
    attribute: string
  ) =>
    axiosClient.post<string>(`/${PREFIX_API}/crawl/single`, {
      urlPost,
      nameChapter,
      querySelector,
      attribute,
      comicId,
    }),
  deleteSingleChapter: (chapterId: number) =>
    axiosClient.delete<string>(`/${PREFIX_API}/${chapterId}`),
  updateChapter: (chapterId: number, formdata: FormData) =>
    axiosClient.put<string>(`/${PREFIX_API}/${chapterId}`, formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  reorderListChapter: (
    comicId: number,
    listReorderedChapter: ReorderChapter[]
  ) =>
    axiosClient.patch<string>(`/${PREFIX_API}/reorder`, {
      listReorderedChapter,
      comicId,
    }),
};

export default ChapterService;
