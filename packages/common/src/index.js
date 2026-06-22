"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TICKER_DATA = exports.UserSchema = exports.API_VERSION = exports.APP_NAME = void 0;
exports.APP_NAME = "High Traffic App";
exports.API_VERSION = "v1";
// Example shared Zod schema
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(2),
});
exports.DEFAULT_TICKER_DATA = [
    { line1: "ULTRA SEOUL 2026", line2: "JULY 15-17 MAIN STAGE" },
    { line1: "WORLD DJ FESTIVAL", line2: "AUGUST 05-07 DOWNTOWN" },
    { line1: "HIP-HOP BATTLE GROUND", line2: "SEPTEMBER 20 LIVE NOW" },
];
