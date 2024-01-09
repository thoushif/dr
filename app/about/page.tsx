import NewsletterForm from "@/components/newsletter/NewsLetterForm";
import { cn } from "@/lib/utils";
import { roboto_mono } from "@/lib/utils/fonts";
import React from "react";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <div className="p-8 text-slate-800 bg-gradient-to-b from-slate-100 to-slate-300">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center w-full h-10 mb-10 cursor-default">
          <p
            className={cn(
              "text-transparent text-7xl bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
              roboto_mono.className
            )}
          >
            About Us
          </p>
        </div>
        <p className="mb-6 text-lg">
          Welcome to DroneZone, your ultimate destination for exploring and
          comparing drones. We are passionate about bringing you comprehensive
          information about the latest drone models, their features, and
          providing a platform for enthusiasts to showcase their drones.
        </p>

        <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
        <ul className="pl-8 mb-6 list-disc">
          <li>
            Inform and Educate: We strive to provide detailed information about
            various drones, helping you make informed decisions when choosing
            the perfect drone for your needs.
          </li>
          <li>
            Facilitate Comparison: Our comparison tools allow you to easily
            compare the features of different drones, making it simple to find
            the one that suits your requirements.
          </li>
          <li>
            Showcase Your Drone: We encourage drone enthusiasts to share their
            amazing drone experiences with our community. Explore our showcase
            section to view stunning drone photos and videos submitted by fellow
            enthusiasts.
          </li>
        </ul>

        <h2 className="mb-4 text-2xl font-bold">Key Features</h2>
        <ul className="pl-8 mb-6 list-disc">
          <li>
            Drone Database: Browse through our extensive drone database,
            featuring detailed specifications, reviews, and user ratings for a
            wide range of drone models.
          </li>
          <li>
            Comparison Tool: Use our comparison tool to side-by-side compare the
            features of multiple drones. Make an informed decision based on the
            aspects that matter most to you.
          </li>
          <li>
            Showcase Your Drone: Share the beauty of your drone with the world!
            Upload photos to our showcase section and connect with other drone
            enthusiasts.
          </li>
        </ul>

        <h2 className="mb-4 text-2xl font-bold">Get Involved</h2>
        <ul className="pl-8 mb-6 list-disc">
          <li>
            Submit Your Showcase: Showcase your drone photography skills by
            submitting your best shots. Let the community appreciate and be
            inspired by your work.
          </li>
        </ul>

        <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
        <p className="mb-6">
          Have questions or suggestions? We'd love to hear from you. Reach out
          to us at{" "}
          <a className="underline" href="mailto:contact.dronezone@gmail.com">
            contact.dronezone@gmail.com
          </a>
          .
        </p>

        <h2 className="mb-4 text-2xl font-bold">Connect With Us</h2>
        <p className="mb-6">
          Stay updated on the latest drone news and community highlights by
          following us on social media:
        </p>
        <ul className="pl-8 mb-6 list-disc">
          <li>
            <a className="underline" href="#!">
              Facebook
            </a>
          </li>
          <li>
            <a className="underline" href="#!">
              Twitter
            </a>
          </li>
          <li>
            <a className="underline" href="#!">
              Instagram
            </a>
          </li>
        </ul>
        <p>Thank you for choosing DroneZone. Happy droning!</p>

        <h2 className="justify-center mt-10 text-3xl font-semibold">
          Join Newsletter
        </h2>
        <p className="text-gray-600 ">
          Exclusive content, latest news about drones & upcoming events sent
          straight to your inbox.
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
};

export default About;
