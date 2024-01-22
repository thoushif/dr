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
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { getDefaultEventForForm } from "@/lib/sanity/queryMaker";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { EventDetails } from "./EventDetails";
import { eventDataSchema } from "./SchemaZOD";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
export function EventForm() {
  const form = useForm<EventData>({
    resolver: zodResolver(eventDataSchema),
  });
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = form;
  const [eventDuration, setEventDuration] = useState<number>(7);
  const [startDate, setStartDate] = useState<Date>(new Date());
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
    // console.log("submitted");
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
    setValue("dateTime.end", addDays(getValues("dateTime.start"), value));
  };

  const handleIncreaseDuration = () => {
    const newDuration = eventDuration + 1;
    setEventDuration(newDuration);
    setValue("dateTime.end", addDays(getValues("dateTime.start"), newDuration));
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
          className="w-2/3 space-y-6 text-xs"
        >
          <div className="flex flex-row items-center gap-3 justify-items-center">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription>Name of your event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrivateEvent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-4">Is it private event?</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {Boolean(field.value) ? " Yeap!" : " Nope!"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="..." {...field} maxLength={500} />
                </FormControl>
                <FormDescription>Describe a little if possible</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-3">
            <Select
              value={`${eventDuration}`}
              onValueChange={(e: string) => handleDurationChange(Number(e))}
            >
              <SelectTrigger className="w-32 ">
                <SelectValue placeholder="how long?" />
              </SelectTrigger>

              <SelectContent>
                <>
                  {[...Array(100)].map((_, index) => (
                    <SelectItem value={`${index + 1}`} key={`duration${index}`}>
                      {" "}
                      {index + 1} days
                    </SelectItem>
                  ))}
                </>
              </SelectContent>
            </Select>
            <Button
              type="button"
              className=" bg-slate-500"
              onClick={handleIncreaseDuration}
            >
              +
            </Button>
            <FormField
              control={form.control}
              name="dateTime.start"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
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
                        selected={startDate}
                        onSelect={(startDate) => {
                          field.onChange;
                          if (startDate) {
                            // console.log(startDate, eventDuration);
                            setValue(
                              "dateTime.end",
                              addDays(startDate, eventDuration)
                            );
                            setValue("dateTime.start", startDate);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Start Date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateTime.end"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(Number(field.value), "PPP")
                    ) : (
                      <span>End date</span>
                    )}
                  </Button>
                  <FormDescription>End Date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location.name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Sky Racetrack" {...field} />
                </FormControl>
                <FormDescription>Where is it gonna happen?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="123 Drone Avenue, Drone City, DC 12345"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Where is it gonna happen?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventSiteLink"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="https://dronezone.com"
                    {...field}
                    title="Please enter a valid email address"
                  />
                </FormControl>
                <FormDescription>Website</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizer.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizer name</FormLabel>
                <FormControl>
                  <Input placeholder="DJ-DZ" {...field} />
                </FormControl>
                <FormDescription>Name of the Organizer</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizer.contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>contact email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@dronezone.com" {...field} />
                </FormControl>
                <FormDescription>email to contact</FormDescription>
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
        {JSON.stringify(errors)}
      </Form>
    </>
  );
}
