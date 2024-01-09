import SearchBanner from "@/components/ui/SeachBanner";

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
    <>
      <SearchBanner />
      {children}
    </>
  );
}
