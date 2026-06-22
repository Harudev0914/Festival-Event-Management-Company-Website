"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = void 0;
const winston = __importStar(require("winston"));
/**
 * Redacts sensitive PII data from log objects.
 * Covers common fields like email, phone, password, and resident numbers.
 */
const redactPii = winston.format((info) => {
    const piiFields = ['email', 'phone', 'password', 'phoneNumber', 'address', 'residentNumber'];
    const redact = (obj) => {
        if (typeof obj !== 'object' || obj === null)
            return obj;
        const newObj = { ...obj };
        for (const key in newObj) {
            if (piiFields.includes(key)) {
                newObj[key] = '[REDACTED]';
            }
            else if (typeof newObj[key] === 'object') {
                newObj[key] = redact(newObj[key]);
            }
        }
        return newObj;
    };
    const redactedInfo = redact(info);
    return redactedInfo;
});
exports.loggerConfig = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), redactPii(), // Apply PII redaction
            winston.format.json()),
        }),
        // Separate file for Security Audit Logs
        new winston.transports.File({
            filename: 'logs/audit.log',
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), redactPii(), winston.format.json()),
        }),
    ],
};
