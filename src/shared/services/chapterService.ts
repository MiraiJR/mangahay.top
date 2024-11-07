import axiosClient from "../libs/axiosClient";

const ChapterService = {
  getChapter: (slug: string) => axiosClient.get<Chapter>(`/chapters/${slug}`),
  createChapter: (formdata: FormData) =>
    axiosClient.post<string>(`/chapters`, formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
};

export default ChapterService;
