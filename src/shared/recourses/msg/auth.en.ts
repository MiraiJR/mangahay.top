import { AuthResource } from "./auth.vi";

export const auth: AuthResource = {
  forgetPassword: {
    forgetPassword: "Forgot Password",
    emptyEmail: "Please enter your email address!",
    wrongStructureEmail: "Please enter a valid email structure!",
    resend: "Resend",
    inputEmail: "Enter email",
  },
  login: {
    label: "Login",
  },
};
