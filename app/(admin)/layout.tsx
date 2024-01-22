import "../../styles/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
