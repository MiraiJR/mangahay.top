import moment from "moment";

export const formatDate = (date: Date): string => {
  return moment(date).format("DD/MM/YYYY hh:mm");
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

export const removeRelatedToColorStyleCss = (value: string) => {
  return value
    .replace(/background-color: rgb\(255, 255, 255\)/g, "")
    .replace(/background-color: rgb\(0, 0, 0\)/g, "")
    .replace(/color: rgb\(0, 0, 0\)/g, "")
    .replace(/color: rgb\(5, 5, 5\)/g, "")
    .replace(/color/g, "")
    .replace(/background-color/g, "");
};
