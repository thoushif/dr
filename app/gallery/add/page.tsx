import ShowcaseForm from "@/components/drones/showcase/ShowcaseForm";
import { getFeaturedDrones } from "@/lib/sanity/sanity.util";

export default async function HomePage() {
  const drones = await getFeaturedDrones();

  return (
    <>
      <ShowcaseForm drones={drones} />
    </>
  );
}
