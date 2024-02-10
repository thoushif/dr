import urlFor from "@/lib/sanity/urlFor";
import Image from "next/image";
import Link from "next/link";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={urlFor(value).url()}
            alt="Journal Image"
            width={500}
            height={500}
          />
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre>
          <code>{value.code}</code>
        </pre>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="py-5 ml-10 space-y-5 list-disc">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal mt-lg">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="py-10 text-5xl font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h1 className="py-10 text-4xl font-bold">{children}</h1>
    ),
    h3: ({ children }: any) => (
      <h1 className="py-10 text-3xl font-bold">{children}</h1>
    ),
    h4: ({ children }: any) => (
      <h1 className="py-10 text-2xl font-bold">{children}</h1>
    ),
    blockquote: ({ children }: any) => (
      <div className="pl-4 ml-4 text-gray-700 border-l-8 bg-slate-300">
        {children}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          target="_blank"
          rel={rel}
          className="underline decoration-slate-600 hover:scale-110"
        >
          {children}
        </Link>
      );
    },
  },
};
