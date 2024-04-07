import { getUserOrganizations } from "~/server/db/user";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Organization } from "@prisma/client";

export const organizationRouter = createTRPCRouter({
  getUserOrganizations: protectedProcedure.query(
    async ({ ctx }): Promise<Organization[]> => {
      const uuid = ctx.session.user.id;
      const user = await getUserOrganizations(uuid);
      return user!.organizations;
    },
  ),
});
