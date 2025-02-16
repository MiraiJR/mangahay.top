import { Button, Result } from "antd";
import { useRouter } from "next/router";

interface RequestResultProps {
  isSuccess: boolean;
}

export const RequestResult = ({ isSuccess }: RequestResultProps) => {
  const router = useRouter();
  const title = isSuccess ? "Yêu cầu thành công!" : "Yêu cầu thất bại";
  const subTitle = isSuccess
    ? "Yêu cầu sẽ được xử lý bởi quản trị hệ thống có thể mất vài ngày. Sau khi xử lý xong chúng tôi sẽ liên hệ bạn qua email. Cảm ơn bạn!"
    : "Yêu cầu đã xảy ra lỗi! Bạn có thể gửi yêu cầu lại xong. Rất xin lỗi bạn vì sự bất cập này!";

  return (
    <Result
      status={isSuccess ? "success" : "error"}
      title={title}
      subTitle={subTitle}
      extra={[
        <Button type="primary" key="console" onClick={() => router.push("/")}>
          Trở lại trang chủ
        </Button>,
      ]}
    />
  );
};
