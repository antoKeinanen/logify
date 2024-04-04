import { db } from "../db";

export async function getUserOrganizations(id: string) {
  return db.user.findUnique({
    where: { id },
    select: {
      organizations: true,
    },
  });
}
