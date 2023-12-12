"use client";

import { useForm } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export function EventFormByEventFormat() {
  const form = useForm<EventData>({
    defaultValues: {
      title: "",
    },
  });
  const eventCategories = [
    "Drone Racing Tournament",
    "Aerial Photography Contest",
    "Workshops and Training Session",
    "Drone Technology Seminar",
    "Community Meetup",
    "Product Launch Event",
    "Drone Tech Hackathon",
    "Educational Webinar",
    "Scavenger Hunt with Drone",
    "Environmental Monitoring Challenge",
  ];
  function onSubmit(data: EventData) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md   p-4">
          <code className="text-slate-700">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="A .." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <>
                    {eventCategories!.map((cat) => (
                      <SelectItem value={cat}>{cat}</SelectItem>
                    ))}
                  </>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the category of the event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
