import moment from "moment";

export const formatDate = (date: Date): string => {
  return moment(date).format("DD/MM/YYYY hh:mm");
};

export const extractIdFromSlugChapter = (slug: string): number => {
  const array: string[] = slug.split("-");

  return parseInt(array[array.length - 1]);
};
