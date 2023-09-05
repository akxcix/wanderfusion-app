"use client";
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

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { PATHS } from "@/commons/constants";
import { useNavigate } from "react-router";
import { createNewCalendar } from "@/network/nomadcore/client";
import { Textarea } from "@/components/ui/textarea";

const maxLenName = 30;
const maxLenDescription = 250;

export const CreateGroupForm = () => {
  const navigate = useNavigate();

  const FormSchema = z.object({
    name: z
      .string()
      .max(maxLenName, { message: `length should be <${maxLenName}.` }),
    description: z
      .string()
      .max(maxLenDescription, {
        message: `length should be <${maxLenDescription}.`,
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    createNewCalendar(values)
      .then((response) => {
        if (response) {
          navigate(PATHS.DASHBOARD);
        }
      })
      .catch((e) => {
        console.error("Error adding dates:", e);
      });
  }

  return (
    <div className="flex flex-col p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {" "}
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Japan trip with homies" />
                </FormControl>
                <FormDescription>
                  {`This is your Group's name. Keep it shorter than ${maxLenName} characters,
                  so that it makes sense.`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                {" "}
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A short description about the group"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {`It helps the participants to know the purpose of the group, but keep it 
                  concise. Keep it shorter than ${maxLenDescription} characters.`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};
