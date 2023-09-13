import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { PATHS } from "@/commons/constants";
import { useNavigate } from "react-router";
import { handleLogin } from "@/lib/authutils";
import { useAppDispatch } from "@/store/hooks";
import { setUserFromJwt } from "@/store/userSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";

const FormSchema = z.object({
  email: z.string().email("email is invalid"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    handleLogin(values).then(({ ok, err }) => {
      if (ok) {
        dispatch(setUserFromJwt(ok));
        navigate(PATHS.DASHBOARD);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err,
        });
      }
    });
  }

  return (
    <div className="flex flex-col max-w-fit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <TypographyH3>Log In</TypographyH3>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-row">
              <Button className="grow" type="submit">
                Log In
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
