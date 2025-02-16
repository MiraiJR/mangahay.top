import TextArea from "antd/es/input/TextArea";
import { Button, Col, Row } from "antd";
import { ProjectDescription } from "./ProjectDescription";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface RequestRoleTranslatorProps {}

export const RequestRoleTranslator = ({}: RequestRoleTranslatorProps) => {
  const [listJoinedComic, setListJoinedComic] = useState<number[]>([1]);
  const addComponentComicDescription = () => {
    setListJoinedComic((previousState) => [
      ...previousState,
      previousState.length + 1,
    ]);
  };
  const removeComponentComicDescription = (targetNumbericalOrder: number) => {
    setListJoinedComic((previousState) =>
      previousState.filter(
        (numbericalOrder) => targetNumbericalOrder !== numbericalOrder
      )
    );
  };

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold my-5">
          Gửi yêu cầu trở thành dịch giả trên hệ thống
        </h1>
        <div className="border-2 border-black rounded p-10 flex flex-col gap-4">
          <div>
            <label className="my-2" htmlFor="profileBriefDescription">
              Mô tả sở lược về bản thân:
            </label>
            <TextArea
              id="profileBriefDescription"
              showCount
              maxLength={500}
              placeholder="Mô tả sơ lược"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <span>Truyện đã tham gia:</span>
              <Button
                color="primary"
                variant="solid"
                icon={<PlusOutlined />}
                onClick={() => {
                  addComponentComicDescription();
                }}
              />
            </label>
            <Row gutter={10}>
              {listJoinedComic.map((numbericalOrder) => (
                <Col className="gutter-row" span={6}>
                  <ProjectDescription
                    numbericalOrder={numbericalOrder}
                    onRemove={() => {
                      removeComponentComicDescription(numbericalOrder);
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
