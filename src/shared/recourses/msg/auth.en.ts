import { AuthResource } from "./auth.vi";

export const auth: AuthResource = {
  forgetPassword: {
    label: "Forgot password?",
    forgetPassword: "Forgot password",
    emptyEmail: "Please enter your email address!",
    wrongStructureEmail: "Please enter a valid email structure!",
    resend: "Resend",
    inputEmail: "Enter email",
  },
  password: {
    label: "Password",
    placeholder: "Enter password",
  },
  confirmPassword: {
    label: "Confirm password",
    placeholder: "Re-enter password",
  },
  email: {
    label: "Email",
    placeholder: "Enter email",
  },
  login: {
    label: "Login",
  },
  register: {
    label: "Register",
  },
  fullName: {
    label: "Full name",
    placeholder: "Enter full name",
  },
  validation: {
    emptyInput: "Please fill out all the required information!",
    emptyPassword: "Please enter your password!",
    emptyEmail: "Please enter your email address!",
    notMatchedConfirmPassowrd: "The confirmation password does not match!",
  },
};
