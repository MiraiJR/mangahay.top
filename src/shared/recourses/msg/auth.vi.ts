export const auth = {
  forgetPassword: {
    label: "Quên mật khẩu?",
    forgetPassword: "Quên mật khẩu",
    emptyEmail: "Vui lòng nhập địa chỉ email!",
    wrongStructureEmail: "Vui lòng nhập đúng cấu trúc mail!",
    resend: "Gửi lại",
    inputEmail: "Nhập email",
  },
  password: {
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu",
  },
  confirmPassword: {
    label: "Nhập lại mật khẩu",
    placeholder: "Nhập lại mật khẩu",
  },
  email: {
    label: "Email",
    placeholder: "Nhập email",
  },
  login: {
    label: "Đăng nhập",
  },
  register: {
    label: "Đăng ký",
  },
  fullName: {
    label: "Họ và tên",
    placeholder: "Nhập họ và tên",
  },
  validation: {
    emptyInput: "Vui điền đầy đủ thông tin!",
    emptyPassword: "Vui lòng nhập mật khẩu!",
    emptyEmail: "Vui lòng nhập địa chỉ email!",
    notMatchedConfirmPassowrd: "Nhập lại mật khẩu không khớp!",
  },
};

export type AuthResource = typeof auth;
