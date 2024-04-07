import type { z } from "zod";
import type { newSiteSchema } from "~/lib/validator/new-site";
import { db } from "../db";
import { generateSlug } from "~/lib/generate-slug";

export async function createSite(
  site: z.infer<typeof newSiteSchema>,
  organizationId: string,
) {
  return db.site.create({
    data: {
      siteId: generateSlug(site.name),
      name: site.name,
      url: site.url,
      organizationId,
    },
  });
}
