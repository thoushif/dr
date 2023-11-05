"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, remainingTime * 1000);

    // Decrement the timer every second
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the timeout and interval if the component unmounts
    return () => {
      clearTimeout(redirectTimeout);
      clearInterval(timerInterval);
    };
  }, [remainingTime, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="mb-4 text-6xl">Oops</h1>
        <p className="mb-4 text-xl">
          Something went wrong. You will be redirected to the home page in{" "}
          {remainingTime} seconds.
        </p>
        {remainingTime > 0 && (
          <p className="text-lg">
            If you are not automatically redirected, you can{" "}
            <Link href="/">click here</Link> to go to the home page.
          </p>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
