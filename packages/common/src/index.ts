export const APP_NAME = "High Traffic App";

export const API_VERSION = "v1";

// Example shared Zod schema
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2),
});

export type User = z.infer<typeof UserSchema>;

export type TickerItem = {
  line1: string;
  line2: string;
};

export const DEFAULT_TICKER_DATA: TickerItem[] = [
  { line1: "ULTRA SEOUL 2026", line2: "JULY 15-17 MAIN STAGE" },
  { line1: "WORLD DJ FESTIVAL", line2: "AUGUST 05-07 DOWNTOWN" },
  { line1: "HIP-HOP BATTLE GROUND", line2: "SEPTEMBER 20 LIVE NOW" },
];
