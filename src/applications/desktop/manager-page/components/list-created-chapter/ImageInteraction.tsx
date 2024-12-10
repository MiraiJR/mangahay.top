import { Image } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

interface ImageInteractionProps {
  chapterImage: ChapterImage;
  handleDeleleImage: Function;
}

const styleIconDelete = { color: "red", fontSize: "16px", cursor: "pointer" };

export const ImageInteraction = ({
  chapterImage,
  handleDeleleImage,
}: ImageInteractionProps) => {
  return (
    <div>
      <Image
        src={chapterImage.relativePath}
        alt="Uploaded Image"
        width={100}
        height={100}
        style={{ objectFit: "cover" }}
        placeholder={true}
      />
      <div className="flex gap-2 justify-start items-center">
        <DeleteFilled
          style={styleIconDelete}
          onClick={() => handleDeleleImage(chapterImage.id)}
        />
      </div>
    </div>
  );
};
