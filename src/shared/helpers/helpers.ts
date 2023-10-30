import moment from "moment";
import { baseURL } from "../libs/config";

export const formatDate = (date: Date): string => {
  return moment(date).format("DD/MM/YYYY hh:mm");
};

export const extractIdFromSlugChapter = (slug: string): number => {
  const array: string[] = slug.split("-");

  return parseInt(array[array.length - 1]);
};

export const reduceQualityImage = (imageUrl: string): string => {
  if (imageUrl.includes(`${baseURL?.slice(0, baseURL.lastIndexOf("/"))}`)) {
    return imageUrl;
  }

  const upload = "upload/";
  const indexOfUploadWord = imageUrl.indexOf(upload) + upload.length;
  const lastIndexOfDot = imageUrl.lastIndexOf(".");

  let result =
    imageUrl.slice(0, indexOfUploadWord) +
    "q_10/" +
    imageUrl.slice(indexOfUploadWord, lastIndexOfDot) +
    ".webp";

  return result.startsWith("https") ? result : result.replace("http", "https");
};

export const convertWebpResource = (imageUrl: string): string => {
  if (imageUrl.includes(`${baseURL?.slice(0, baseURL.lastIndexOf("/"))}`)) {
    return imageUrl;
  }

  const upload = "upload/";
  const indexOfUploadWord = imageUrl.indexOf(upload) + upload.length;
  const lastIndexOfDot = imageUrl.lastIndexOf(".");

  let result =
    imageUrl.slice(0, indexOfUploadWord) +
    "q_auto:good/" +
    imageUrl.slice(indexOfUploadWord, lastIndexOfDot) +
    ".webp";

  return result.startsWith("https") ? result : result.replace("http", "https");
};

export const extractComicId = (comicName: string): number => {
  const array = comicName.split("/");
  return parseInt(array[0]);
};

export const shortImageName = (images: string[]): string[] => {
  const sortedFileNames = images.sort((a: string, b: string) => {
    const aFileName = a.split("/")[a.split("/").length - 1];
    const bFileName = b.split("/")[b.split("/").length - 1];
    const aNum = parseInt(aFileName.split(".")[0]);
    const bNum = parseInt(bFileName.split(".")[0]);

    return aNum - bNum;
  });

  return sortedFileNames;
};
