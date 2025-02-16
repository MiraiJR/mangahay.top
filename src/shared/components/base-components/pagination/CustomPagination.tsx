import { Pagination, PaginationProps } from "antd";

interface CustomPaginationProps extends PaginationProps {}

export const CustomPagination = ({
  ...paginationProps
}: CustomPaginationProps) => {
  const { align } = paginationProps ?? "center";
  return <Pagination align={align} {...paginationProps} />;
};
