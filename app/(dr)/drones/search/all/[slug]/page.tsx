import DroneSearch from "@/components/drones/search/DroneSearch";

import _ from "lodash";

type Props = {
  params: {
    slug: string;
  };
};

export default async function DronePageByUsage({ params: { slug } }: Props) {
  // Fill selectedEaseOfUse based on the type in params

  return <DroneSearch drones={undefined} brand={""} slug={slug} />;
}
