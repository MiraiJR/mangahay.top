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
};

export default ChapterService;
