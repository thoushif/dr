"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "../ui/form";

import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { toast } from "../ui/use-toast";
import { saveNewsLetterUnsubscribeData } from "@/lib/sanity/sanity.queries";
import HcaptchaForm from "@/lib/utils/HCatchaForm";

const UnsubscribeSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  //   reasons: z.array(z.string()).refine((data) => data.length > 0, {
  //     message: "Select at least one reason",
  //   }),
  //   otherReason: z.string(),
});

type UnsubscribeFormData = z.infer<typeof UnsubscribeSchema>;

const UnsubscribeForm = () => {
  const searchParams = useSearchParams();
  const defaultEmail = searchParams?.get("email") || "";
  const form = useForm<UnsubscribeFormData>({
    resolver: zodResolver(UnsubscribeSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = form;

  const unsubscribeReasons = [
    "Emails are too frequent",
    "Content is irrelevant",
    "Receiving duplicate emails",
    "Found a better alternative",
    "Considered as spam",
    // Add more reasons as needed
  ];

  const onSubmit: SubmitHandler<UnsubscribeFormData> = async (data) => {
    // Handle form submission logic here
    // console.log(data);
    if (!hCaptchaToken) {
      toast({
        description: "Please finish the captcha",
        variant: "destructive",
      });
      return;
    }
    try {
      await saveNewsLetterUnsubscribeData(data.email);
      toast({
        description: "Successfully unsubscribed",
      });
    } catch {
      toast({
        description: "Subscription does not exist",
      });
    }
  };
  //   const checkAndGetReason = (isChecked: boolean, reason: string) => {
  //     const currentReasons = getValues("reasons");

  //     if (isChecked) {
  //       return [...(currentReasons || []), reason] as string[];
  //     } else {
  //       return (currentReasons || []).filter((r) => r !== reason) as string[];
  //     }
  //   };
  //   const handleCheckboxChange = (reason: string, isChecked: boolean) => {
  //     setValue("reasons", checkAndGetReason(isChecked, reason));
  //   };
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);

  const handleHCaptchaVerify = (token: string | null) => {
    setHCaptchaToken(token);
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-2 text-5xl text-slate-700">
          We hate to see you go!
          <FormDescription className="mt-4 mb-2">Email</FormDescription>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-64" />
                </FormControl>
              </FormItem>
            )}
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
          {/* <FormDescription className="mt-4 mb-2">
          Reasons for Unsubscribing:
        </FormDescription>
        {unsubscribeReasons.map((reason) => (
          <FormItem
            key={reason}
            className="flex flex-row items-start space-x-2 space-y-0"
          >
            <FormControl>
              <Checkbox
                defaultChecked={getValues("reasons")?.includes(reason)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(reason, !!checked)
                }
              />
            </FormControl>{" "}
            <FormLabel className="text-sm font-normal ">{reason}</FormLabel>
          </FormItem>
        ))}

        {errors.reasons && (
          <p className="text-red-400">{errors.reasons.message}</p>
        )}

        <FormDescription className="mt-4 mb-2">
          Comments (optional)
        </FormDescription>
        <FormField
          control={form.control}
          name="otherReason"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us a little bit more why"
                  className="resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
          <HcaptchaForm onVerify={handleHCaptchaVerify} />
          <Button type="submit" className=" bg-slate-700">
            Unsubscribe
            <MdOutlineUnsubscribe className="ml-4 text-lg bg-slate-700" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UnsubscribeForm;
