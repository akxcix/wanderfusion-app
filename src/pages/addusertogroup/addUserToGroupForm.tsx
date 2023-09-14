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
import { TypographyH3 } from "@/components/ui/typography";
import { addNewUsersToGroup } from "@/network/nomadcore/client";

const FormSchema = z.object({
  username: z.string(),
});

interface AddUserToGroupFormProps {
  groupId: string;
  callback?: () => void;
}
export const AddUserToGroupForm = ({
  groupId,
  callback,
}: AddUserToGroupFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    addNewUsersToGroup(groupId, values.username).then(({ ok, err }) => {
      if (ok) {
        if (callback) {
          callback();
        }
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
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <TypographyH3>Add User</TypographyH3>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="grow" type="submit">
              Add User
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
