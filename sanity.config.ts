import { defineConfig, StudioNavbar } from "sanity";
import { deskTool } from "sanity/desk";
//@ts-ignore
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { myTheme } from "./theme";
import Logo from "./@/components/ui/Logo";
import { getDefaultDocumentNode } from "./@/lib/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "Dr-Studio",
  title: "Dr-Studio",
  projectId,
  dataset,

  plugins: [
    deskTool({ defaultDocumentNode: getDefaultDocumentNode }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
  theme: myTheme,
});
