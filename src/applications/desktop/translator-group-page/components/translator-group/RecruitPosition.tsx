import { Collapse, CollapseProps, List, Typography } from "antd";
import { recruitPositions } from "../../constant";
import React from "react";

interface RecruitPositionProps {
  translatorGroupId: string;
}

export const RecruitPosition = ({
  translatorGroupId,
}: RecruitPositionProps) => {
  const items: CollapseProps["items"] = recruitPositions.map(
    (recruitPosition) => {
      return {
        key: recruitPosition.id,
        label: `Tuyển dụng vị trí ${recruitPosition.position} - Số lượng ${recruitPosition.quantity}`,
        children: (
          <div className="flex flex-col gap-4">
            <List
              header={<h2>Yêu cầu</h2>}
              bordered
              dataSource={recruitPosition.requirements}
              renderItem={(item, index) => (
                <List.Item>
                  <Typography.Text mark>[{index + 1}]</Typography.Text> {item}
                </List.Item>
              )}
            />
            <List
              header={<h2>Phúc lợi</h2>}
              bordered
              dataSource={recruitPosition.policies}
              renderItem={(item, index) => (
                <List.Item>
                  <Typography.Text mark>[{index + 1}]</Typography.Text> {item}
                </List.Item>
              )}
            />
          </div>
        ),
      };
    }
  );

  return <Collapse bordered={false} items={items} defaultActiveKey={["1"]} />;
};
