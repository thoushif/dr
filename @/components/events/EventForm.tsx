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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import merge from "lodash/merge";
import { useForm, useWatch } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn, getDefaultEventForForm } from "@/lib/sanity/queryMaker";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { EventDetails } from "./EventDetails";
export function EventForm() {
  const form = useForm<EventData>({
    defaultValues: {
      title: "",
    },
  });
  const { control, getValues, setValue } = form;
  const [eventDuration, setEventDuration] = useState<number>(7);
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

  const formData = useWatch<EventData>({
    control,
    defaultValue: {} as EventData,
  });
  const baseEventInfo = getDefaultEventForForm();
  // Merge base event information with form data
  const mergedData: EventData = merge(baseEventInfo, formData);
  const handleDurationChange = (value: number) => {
    setEventDuration(value);
  };

  const handleIncreaseDuration = () => {
    const newDuration = eventDuration + 1;
    setEventDuration(newDuration);
  };
  // const mergedData: EventData = {
  //   ...baseData,
  //   ...formData,
  // };
  return (
    <>
      <EventDetails event={mergedData} isDraft />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 text-sm"
        >
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

          <div className="flex flex-row">
            <Select
              value={`${eventDuration}`}
              onValueChange={(e) => handleDurationChange(Number(e))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>

              <SelectContent>
                <>
                  {[...Array(100)].map((_, index) => (
                    <SelectItem value={`${index + 1}`}>
                      {" "}
                      {index + 1} days
                    </SelectItem>
                  ))}
                </>
              </SelectContent>
            </Select>
            <Button type="button" onClick={handleIncreaseDuration}>
              +
            </Button>
            <FormField
              control={form.control}
              name="dateTime.start"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(Number(field.value), "PPP")
                          ) : (
                            <span>Start date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Start and end dates of the event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p>
              {" "}
              {format(
                addDays(getValues("dateTime.start")!!, eventDuration),
                "PPP"
              )}
            </p>
          </div>
          <FormField
            control={form.control}
            name="location.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location name</FormLabel>
                <FormControl>
                  <Input placeholder="A .." {...field} />
                </FormControl>
                <FormDescription>Name of the location</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <>
                {eventCategories!.map((cat) => (
                  <DropdownMenuCheckboxItem>{cat}</DropdownMenuCheckboxItem>
                ))}
              </>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
