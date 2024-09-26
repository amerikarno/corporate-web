import { z } from "zod";

export const orderTradeSchema = z.object({
  cryptoAmount: z.string(),
  fiatAmount: z.string(),
  currency: z.string(),
  cryptoPrice: z.string(),
  pair: z.string(),
});
