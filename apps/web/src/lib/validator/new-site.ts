import { z } from "zod";

export const newSiteSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      "Only alphanumeric characters and spaces are allowed",
    ),
  url: z.string().url(),
  activeOrganization: z.string().regex(/^[a-zA-Z0-9-]+$/),
});
