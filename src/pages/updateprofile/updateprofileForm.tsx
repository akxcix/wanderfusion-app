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
import { PATHS } from "@/commons/constants";
import { useNavigate } from "react-router";
import { updateProfile } from "@/network/passport/client";
import { useGetProfilePic, useGetUsername } from "@/redux/utils";
import { randomUsername } from "@/lib/utils";

export const UpdateProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const username = useGetUsername() || randomUsername();
  const profilePic = useGetProfilePic() || "";

  const FormSchema = z.object({
    username: z.string().default(username).optional(),
    profilePic: z
      .string()
      .url("invalid url")
      .default(profilePic)
      .optional()
      .or(z.literal("")),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username, profilePic },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    updateProfile(values).then(({ status, data }) => {
      if (status === "error") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data,
        });
      } else {
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
            className="flex flex-col space-y-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="username"
                      defaultValue={username}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="profilePic"
                      defaultValue={profilePic}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
