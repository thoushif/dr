"use client";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="mb-4 text-6xl">Oops</h1>
        <p className="mb-4 text-xl">
          Something went wrong.
          <Link href="/">click here</Link> to go to the home page.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
