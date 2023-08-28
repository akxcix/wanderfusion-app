import { TypographyH1 } from "@/components/ui/typography";
import { LoginForm } from "./loginForm";

export function Login() {
  return (
    <div className="login">
      <TypographyH1>Login</TypographyH1>
      <LoginForm />
    </div>
  );
}
