import { z } from "zod";

export const individualAccountSchema = z.object({
  thTitle: z.string(),
  thName: z.string(),
  thSurname: z.string(),
  engTitle: z.string(),
  engName: z.string(),
  engSurname: z.string(),
  email: z.string(),
  mobile: z.string(),
  birthDate: z.string(),
  marriageStatus: z.string(),
  citizenId: z.string(),
  laserCode: z.string(),
  agreement: z.boolean(),
});

export type TIndividualAccount = z.infer<typeof individualAccountSchema>;
