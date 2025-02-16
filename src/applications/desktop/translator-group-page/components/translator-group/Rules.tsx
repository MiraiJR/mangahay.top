import { List, Typography } from "antd";

interface RulesProps {
  translatorGroupId: string;
}

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export const Rules = ({ translatorGroupId }: RulesProps) => {
  return (
    <List
      header={<h2>Nội quy của nhóm</h2>}
      bordered
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <Typography.Text mark>[Điều {index}]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};
