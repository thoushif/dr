import DroneSearch from "@/components/drones/search/DroneSearch";
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 1800;

export default async function DronePageByBrand({ params: { slug } }: Props) {
  const drones: DroneThumbnail[] | undefined = undefined;
  // console.log(drones);
  return <DroneSearch drones={drones} brand={slug} />;
}
