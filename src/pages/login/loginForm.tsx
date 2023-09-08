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
import { useDispatch } from "react-redux";
import { useSetPayload } from "@/redux/utils";

const FormSchema = z.object({
  email: z.string().email("email is invalid"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const setPayload = useSetPayload();

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    handleLogin(values, dispatch).then(({ ok, err }) => {
      if (ok) {
        // storeJwt(ok.authToken);
        setPayload(ok);
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
