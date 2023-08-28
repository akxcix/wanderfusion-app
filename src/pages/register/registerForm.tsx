import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { register } from "@/network/auth";
import { useNavigate } from "react-router";
import { PATHS } from "@/commons/constants";

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
    register(values).then(({ status, data }) => {
      if (status === "error") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data,
        });
      } else {
        toast({
          description: data,
        });
        navigate(PATHS.LOGIN);
      }
    });
  }

  return (
    <div className="loginForm">
      <div className="flex flex-col p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
