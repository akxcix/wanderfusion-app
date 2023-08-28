import { TypographyH1 } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <LoginForm />
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <RegisterForm />
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export function Login() {
  return (
    <div>
      <TypographyH1>Login</TypographyH1>
      <TabsDemo />
    </div>
  );
}
