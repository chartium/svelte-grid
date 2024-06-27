import { createKitDocsLoader } from "@svelteness/kit-docs";
import type { LayoutLoad } from "./$types.js";

export const load = createKitDocsLoader({
  sidebar: {
    "/": null,
    "/docs": "/docs",
  },
}) satisfies LayoutLoad;
