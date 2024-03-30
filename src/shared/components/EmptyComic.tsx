import Image, { StaticImageData } from "next/image";
import EmptyImage from "@/shared/assets/empty.webp";

interface itemProps {
  content?: string;
  image?: StaticImageData | string;
}

const EmptyComic = ({
  content = "Không có truyện",
  image = EmptyImage,
}: itemProps) => {
  return (
    <div className="text-center flex flex-col items-center justify-center w-full">
      <Image priority width={200} src={image} alt="Không có truyện" />
      <span>{content}</span>
    </div>
  );
};

export default EmptyComic;
