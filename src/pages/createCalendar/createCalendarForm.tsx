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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const CreateCalendarForm = () => {
  const navigate = useNavigate();

  const FormSchema = z.object({
    name: z.string(),
    visibilityControl: z.enum(["private", "public"], {
      required_error: "You need to select a visibility option.",
    }),
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
                <FormLabel>Calendar Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Japan trip with homies" />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym. You can only change this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibilityControl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visibility</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">Private</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <FormLabel className="font-normal">Public</FormLabel>
                  </FormItem>
                </RadioGroup>
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
