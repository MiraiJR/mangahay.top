import { Button, Card, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ProjectDescriptionProps {
  numbericalOrder: number;
  onRemove: () => void;
}

export const ProjectDescription = ({
  numbericalOrder,
  onRemove,
}: ProjectDescriptionProps) => {
  const extraTemplate = () => {
    return (
      <Button
        color="danger"
        variant="solid"
        icon={<CloseOutlined />}
        onClick={onRemove}
      />
    );
  };

  return (
    <Card
      title={`Truyện đã tham gia #${numbericalOrder}`}
      extra={extraTemplate()}
      size="default"
    >
      <div>
        <label className="my-2" htmlFor="comicName">
          <strong className="text-red-400">*</strong>Tên truyện:
        </label>
        <Input id="comicName" placeholder="Tên truyện" />
      </div>
      <div>
        <label className="my-2" htmlFor="teamTranslatorName">
          <strong className="text-red-400">*</strong>Tên nhóm dịch đã tham gia:
        </label>
        <Input id="teamTranslatorName" placeholder="Tên nhóm dịch" />
      </div>
      <div>
        <label className="my-2" htmlFor="linkToProduct">
          <strong className="text-red-400">*</strong>Đường dẫn đến sản phẩm:
        </label>
        <Input id="linkToProduct" placeholder="Đường dẫn đến sản phẩm" />
      </div>
    </Card>
  );
};
