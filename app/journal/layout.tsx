import PostsCategoriesBanner from "@/components/posts/PostsCategoriesBanner";

export const metadata = {
  title: "DroneZone - Journal",
  description: "The place where every drone owners can fly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PostsCategoriesBanner />
      {children}
    </>
  );
}
