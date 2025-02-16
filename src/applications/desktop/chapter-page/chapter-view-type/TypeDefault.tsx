import Image from "next/image";
import { usePageContext } from "../Context";

export const TypeDefault = () => {
  const { chapter, comic } = usePageContext();

  return (
    <>
      {chapter?.images.map((image, index) => (
        <Image
          loading="lazy"
          width={0}
          height={0}
          className="w-[70%] mobile:w-[100%] object-fit"
          src={image.relativePath}
          alt={`${chapter?.name}-${comic?.name}`}
          key={index}
        />
      ))}
    </>
  );
};
