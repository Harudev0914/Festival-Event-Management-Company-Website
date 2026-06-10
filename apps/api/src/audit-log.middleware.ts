import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditLogMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AUDIT');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      
      // Log every access for audit purposes
      this.logger.log({
        message: `Access Log: ${method} ${originalUrl}`,
        context: 'AuditMiddleware',
        audit: {
          method,
          url: originalUrl,
          statusCode,
          ip,
          userAgent,
          timestamp: new Date().toISOString(),
          // Note: Winston config will redact any PII in body if we were to log it
        }
      });
    });

    next();
  }
}
