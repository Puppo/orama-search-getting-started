import { z } from "zod";

export const City = z.object({
  city: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  country: z.string(),
  iso2: z.string(),
  admin_name: z.string(),
  capital: z.enum(["primary", "admin", "minor", ""]),
  population: z.coerce.number(),
  population_proper: z.coerce.number(),
});

export type City = z.infer<typeof City>;

export const Cities = z.array(City);
