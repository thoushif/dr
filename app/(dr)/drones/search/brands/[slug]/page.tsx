import DroneSearch from "@/components/drones/search/DroneSearch";
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 1800;

export default async function DronePageByBrand({ params: { slug } }: Props) {
  return <DroneSearch drones={undefined} brand={slug} slug={""} />;
}
