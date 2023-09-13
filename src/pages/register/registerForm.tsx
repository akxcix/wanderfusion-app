import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { register } from "@/network/passport/client";
import { useNavigate } from "react-router";
import { PATHS } from "@/commons/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";

const FormSchema = z.object({
  email: z.string().email("email is invalid"),
  password: z.string().min(8, "Password must be 8 characters"),
});

export const RegisterForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    register(values).then(({ ok, err }) => {
      if (ok) {
        toast({
          description: ok,
        });
        navigate(PATHS.LOGIN);
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
              <TypographyH3>Register</TypographyH3>
            </CardHeader>
            <CardContent className="space-y-5">
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
                    <FormDescription>
                      use a password manager please lol
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="grow" type="submit">
                Register
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
