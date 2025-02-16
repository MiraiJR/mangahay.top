import { Button, Result } from "antd";
import { useRouter } from "next/router";

export default function RegisterRoute() {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang này không tồn tại hoặc đang trong quá trình phát triển."
      extra={
        <Button type="primary" onClick={() => router.push("/")}>
          Trở về trang chủ
        </Button>
      }
    />
  );
}
