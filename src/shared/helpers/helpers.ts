import moment from "moment";
import { v1 as uuidv1 } from "uuid";

export const formatDate = (date: Date): string => {
  return moment(date).format("DD/MM/YYYY hh:mm");
};

export const extractComicId = (comicName: string): number => {
  const array = comicName.split("/");
  return parseInt(array[0]);
};

export const removeRelatedToColorStyleCss = (value: string) => {
  return value
    .replace(/background-color: rgb\(255, 255, 255\)/g, "")
    .replace(/background-color: rgb\(0, 0, 0\)/g, "")
    .replace(/color: rgb\(0, 0, 0\)/g, "")
    .replace(/color: rgb\(5, 5, 5\)/g, "")
    .replace(/color/g, "")
    .replace(/background-color/g, "");
};

export const generateUniqueString = () => {
  const uniqueString = uuidv1();
  return uniqueString;
};
