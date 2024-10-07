import { z } from "zod";

export const orderTradeSchema = z.object({
  id: z.string().optional(),
  customerCode: z.string().optional(),
  icoCode: z.string().optional(),
  amount: z.string().min(1, "required amount"),
  value: z.string().min(1, "required value"),
  currency: z.string().min(1, "required currency"),
  status: z.number().optional(),
});

export type TOrderTrade = z.infer<typeof orderTradeSchema>;
// export const orderTradeSchema = z.object({
//   cryptoAmount: z.string(),
//   fiatAmount: z.string(),
//   currency: z.string(),
//   cryptoPrice: z.string(),
//   pair: z.string(),
// });
