import { z } from "zod";

export const orderTradeSchema = z.object({
  id: z.string().optional().nullable(),
  customerCode: z.string().optional().nullable(),
  icoCode: z.string().optional().nullable(),
  amount: z.string().min(1, "required amount"),
  value: z.string().min(1, "required value"),
  currency: z.string().min(1, "required currency"),
  status: z.number().optional().nullable(),
});

export type TOrderTrade = z.infer<typeof orderTradeSchema>;
