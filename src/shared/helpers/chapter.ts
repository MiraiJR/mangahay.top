import moment from "moment";

export const getNextPreAofChapterFromId = (
  chapterId: number,
  chapters: Chapter[]
): DetailChapter => {
  const index = chapters.findIndex((chapter) => chapter.id === chapterId);

  if (index === -1) {
    throw new Error(`Chapter with id ${chapterId} not found.`);
  }

  const previousChapter =
    index < chapters.length - 1 ? chapters[index + 1] : null;
  const currentChapter = chapters[index];
  const nextChapter = index > 0 ? chapters[index - 1] : null;

  return {
    previousChapter,
    currentChapter,
    nextChapter,
  };
};

export const isNewChapter = (date: Date) => {
  const currentDate = moment();
  const givenDate = moment(date);

  return currentDate.diff(givenDate, "hours") <= 24 * 3;
};
