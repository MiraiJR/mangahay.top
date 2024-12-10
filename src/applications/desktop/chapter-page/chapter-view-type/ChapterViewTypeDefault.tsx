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
      {images.map((image, index) => (
        <Image
          loading="lazy"
          width={0}
          height={0}
          className="w-[70%] mobile:w-[100%] object-fit"
          src={image}
          alt={`${chapterName}-${comicName}`}
          key={index}
        />
      ))}
    </>
  );
};

export default ChapterViewTypeDefault;
