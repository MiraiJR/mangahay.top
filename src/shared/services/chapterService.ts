import axiosClient from "../libs/axiosClient";

const ChapterService = {
  getChapter: (chapterId: number) =>
    axiosClient.get<Chapter>(`/chapters/${chapterId}`),
};

export default ChapterService;
