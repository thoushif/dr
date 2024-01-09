"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewsLetterFormData, newsletterSchema } from "../events/SchemaZOD";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveNewsletterData } from "@/lib/sanity/sanity.queries";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "../ui/skeleton";

// Define the Zod schema for form data

const NewsletterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormData>({
    resolver: zodResolver(newsletterSchema),
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<NewsLetterFormData> = async (data) => {
    setLoading(true); // Set loading to true when submitting

    try {
      await saveNewsletterData(data);
      toast({
        description: "Successfully subscribed",
      });
    } catch {
      toast({
        description: "Subscription already exists",
      });
    } finally {
      setLoading(false); // Set loading to false when submission is complete
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center py-2 border-b-2 border-gray-600">
          <input
            {...register("name")}
            type="text"
            className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
            placeholder="Name"
          />
          <input
            {...register("email")}
            type="email"
            className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
            placeholder="Email"
          />
          <button
            type="submit"
            className="flex-shrink-0 px-2 py-1 text-sm text-white border-4 rounded-full cursor-pointer bg-slate-600 border-slate-600 hover:bg-slate-700 hover:border-slate-700"
          >
            {loading ? (
              <Skeleton className="w-6 h-6 rounded-full" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
      <div className="mt-2 text-red-500">
        {errors.name && <p>{errors.name.message}</p>}
        {errors.email && <p>{errors.email.message}</p>}
      </div>
    </div>
  );
};

export default NewsletterForm;
