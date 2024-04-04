import { newSiteSchema } from "~/lib/validator/new-site";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserOrganizations } from "~/server/db/user";
import { createSite } from "~/server/db/site";
import {
  getOrganizationByID,
  getOrganizationSites,
} from "~/server/db/organization";
import { generateSlug } from "~/lib/generate-slug";
import { z } from "zod";

export const siteRouter = createTRPCRouter({
  createSite: protectedProcedure
    .input(newSiteSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserOrganizations(ctx.session.user.id);
      if (
        !user!.organizations.find((org) => org.id === input.activeOrganization)
      ) {
        console.log(user?.organizations, "\n", input.activeOrganization);
        throw new Error("User does not have access to this organization");
      }

      const activeOrganization = await getOrganizationByID(
        input.activeOrganization,
      );
      const slug = generateSlug(input.name);
      const organizationSites = await getOrganizationSites(
        activeOrganization!.id,
      );
      if (
        organizationSites!.sites.find((site) => site.organizationId === slug)
      ) {
        throw new Error("Site with this name already exists");
      }

      return createSite(input, activeOrganization!.id);
    }),

  getOrganizationSites: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await getUserOrganizations(ctx.session.user.id);
      if (!user!.organizations.find((org) => org.id === input.id)) {
        throw new Error("User does not have access to this organization");
      }

      return getOrganizationSites(input.id);
    }),
});
