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
import { PATHS } from "@/commons/constants";
import { useNavigate } from "react-router";
import { updateProfile } from "@/network/passport/client";
import { useGetProfilePic, useGetUsername } from "@/redux/utils";
import { randomUsername } from "@/lib/utils";
import { Code } from "lucide-react";

export const UpdateProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const username = useGetUsername() || randomUsername();
  const profilePic = useGetProfilePic() || "";

  const FormSchema = z.object({
    username: z
      .string()
      .refine((s) => !s.includes(" "), "spaces are not allowed")
      .default(username)
      .optional(),
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
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="frootloops511"
                      defaultValue={username}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your username. This is what everyone else on the
                    platform will refer you as. It can be real or a pseudonym.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://github.com/<username>.png"
                      defaultValue={profilePic}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your avatar, and what everyone else will see you as.
                    This should be a URL pointing to an image. An example is
                    "https://github.com/&lt;username&gt;.png"
                  </FormDescription>
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
