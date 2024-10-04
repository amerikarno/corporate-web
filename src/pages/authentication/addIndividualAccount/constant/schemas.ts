import { z } from "zod";

export const individualAccountSchema = z.object({
  thTitle: z.string().min(1, "Required"),
  thName: z.string().min(1, "Required"),
  thSurname: z.string().min(1, "Required"),
  engTitle: z.string().min(1, "Required"),
  engName: z.string().min(1, "Required"),
  engSurname: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  mobile: z.string().min(1, "Required"),
  birthDate: z.string().min(1, "Required"),
  marriageStatus: z.string().min(1, "Required"),
  citizenId: z.string().min(1, "Required"),
  laserCode: z.string().min(1, "Required"),
  agreement: z.boolean().refine((val) => val === true, {
    message: "Required",
  }),
});

export type TIndividualAccount = z.infer<typeof individualAccountSchema>;
