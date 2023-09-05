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
import { LOCALSTORAGE_JWT_KEY, PATHS } from "@/commons/constants";
import { useSetPayload } from "@/redux/utils";
import { useNavigate } from "react-router";
import { handleLogin } from "@/lib/authutils";
import { useDispatch } from "react-redux";

const FormSchema = z.object({
  email: z.string().email("email is invalid"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

const storeJwt = (token: string) => {
  localStorage.setItem(LOCALSTORAGE_JWT_KEY, token);
};

export const LoginForm = () => {
  const dispatch = useDispatch();

  const { toast } = useToast();
  const setPayload = useSetPayload();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    handleLogin(values, dispatch).then(({ status, data }) => {
      if (status === "error") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data,
        });
      } else {
        storeJwt(data);
        setPayload(data);
        navigate(PATHS.DASHBOARD);
      }
    });
  }

  return (
    <div className="loginForm">
      <div className="flex flex-col p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
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
            <Button type="submit">Log In</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
