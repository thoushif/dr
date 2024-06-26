import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/contexts/Providers";
import Banner from "../@/components/ui/Banner";
import "../styles/globals.css";

export const metadata = {
  title: "DroneZone",
  description: "The place where every drone owners can fly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7468746919417634"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen mx-auto max-w-7xl">
            <Banner />
            {/* <hr className="border-[#f7ab0a] mb-10" /> */}

            {children}
            <Toaster />
            <footer className="p-8 py-6 mt-auto text-white bg-slate-700 footer">
              <div className="container flex flex-wrap justify-between mx-auto">
                <div className="w-full md:w-1/2 lg:w-1/4">
                  <h3 className="mb-4 text-lg font-semibold">About</h3>
                  <ul>
                    <li>
                      <a href="/about">About Us</a>
                    </li>

                    <li>
                      <a href="/terms">Terms and Privacy</a>
                    </li>

                    <li>
                      <a href="/newsletter/unsubscribe">Unsubscribe</a>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4">
                  <h3 className="mb-4 text-lg font-semibold">Showcase</h3>
                  <ul>
                    <li>
                      <a href="/drones/search/brands">Brands</a>
                    </li>
                    <li>
                      <a href="/gallery">Showcase</a>
                    </li>

                    <li>
                      <a href="/journal">Journals</a>
                    </li>

                    <li>
                      <a href="/maker">Maker</a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
