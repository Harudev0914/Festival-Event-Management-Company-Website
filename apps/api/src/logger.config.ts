import * as winston from 'winston';

/**
 * Redacts sensitive PII data from log objects.
 * Covers common fields like email, phone, password, and resident numbers.
 */
const redactPii = winston.format((info) => {
  const piiFields = ['email', 'phone', 'password', 'phoneNumber', 'address', 'residentNumber'];
  
  const redact = (obj: any) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    const newObj = { ...obj };
    for (const key in newObj) {
      if (piiFields.includes(key)) {
        newObj[key] = '[REDACTED]';
      } else if (typeof newObj[key] === 'object') {
        newObj[key] = redact(newObj[key]);
      }
    }
    return newObj;
  };

  const redactedInfo = redact(info);
  return redactedInfo;
});

export const loggerConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        redactPii(), // Apply PII redaction
        winston.format.json(),
      ),
    }),
    // Separate file for Security Audit Logs
    new winston.transports.File({
      filename: 'logs/audit.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        redactPii(),
        winston.format.json(),
      ),
    }),
  ],
};
