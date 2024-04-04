import { db } from "../db";



export async function getOrganizationByID(organizationId: string) {
  return db.organization.findUnique({
    where: { id: organizationId },
  });
}

export async function getOrganizationSites(organizationId: string) {
  return db.organization.findUnique({
    where: { id: organizationId },
    select: {
      sites: true,
    },
  });
}
