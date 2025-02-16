import { Table, TableColumnsType } from "antd";
import { translatorGroup } from "../../constant";
import { MinimumUser } from "@/shared/components/MinimumUser";
import { TranslatorGroupDescription } from "./TranslatorGroupDescription";

interface MemberTableProps {}

export const MemberTable = ({}: MemberTableProps) => {
  const columns: TableColumnsType<TranslatorGroupMember> = [
    {
      title: "Thành viên",
      key: "member",
      render: (member: TranslatorGroupMember) => {
        return (
          <MinimumUser
            user={{
              id: member.id,
              email: member.email,
              fullname: member.fullname,
              avatar: member.avatar,
            }}
          />
        );
      },
    },
    {
      title: "Vai trò",
      key: "role",
      render: (member: TranslatorGroupMember) => {
        return <span>{member.role}</span>;
      },
    },
  ];
  const dataSource: TranslatorGroupMember[] = translatorGroup.members;

  return (
    <div>
      <Table<TranslatorGroupMember>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
};
