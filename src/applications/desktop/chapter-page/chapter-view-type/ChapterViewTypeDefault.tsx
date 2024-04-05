import { convertWebpResource, shortImageName } from "@/shared/helpers/helpers";
import Image from "next/image";

interface itemProps {
  images: string[];
  chapterName: string;
  comicName: string;
}

const ChapterViewTypeDefault = ({
  images,
  chapterName,
  comicName,
}: itemProps) => {
  return (
    <>
      {shortImageName(images).map((image, _index) => (
        <Image
          loading="lazy"
          width={0}
          height={0}
          className="w-[80%] mobile:w-[100%] object-fit"
          src={convertWebpResource(image)}
          alt={`${chapterName}-${comicName}`}
          key={_index}
        />
      ))}
    </>
  );
};

export default ChapterViewTypeDefault;
