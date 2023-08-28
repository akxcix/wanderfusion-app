import { TypographyH1 } from "@/components/ui/typography";
import { RegisterForm } from "./registerForm";

export const Register = () => {
  return (
    <div className="register">
      <TypographyH1>Register</TypographyH1>
      <RegisterForm />
    </div>
  );
};
