import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import("./RegisterForm"), { ssr: false });

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
