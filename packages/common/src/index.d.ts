export declare const APP_NAME = "High Traffic App";
export declare const API_VERSION = "v1";
import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    email?: string;
    name?: string;
}, {
    id?: string;
    email?: string;
    name?: string;
}>;
export type User = z.infer<typeof UserSchema>;
export type TickerItem = {
    line1: string;
    line2: string;
};
export declare const DEFAULT_TICKER_DATA: TickerItem[];
