import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  return (
    <div className="loginForm">
      <div className="flex flex-col space-y-1 p-1">
        <Input type={"text"} placeholder="username" />
        <Input type={"password"} placeholder="password" />
        <Button>Lemme In!</Button>
      </div>
    </div>
  );
};
