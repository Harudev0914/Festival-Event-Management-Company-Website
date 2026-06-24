import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { redisStore } from 'cache-manager-redis-yet';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailProcessor } from './mail.processor';
import { loggerConfig } from './logger.config';
import { AuditLogMiddleware } from './audit-log.middleware';
import { AuthModule } from './auth/auth.module';
import { AdminConfigController } from './admin/admin-config.controller';
import { AnalyticsController } from './analytics.controller';
import { AnnouncementsModule } from './admin/announcements/announcements.module';
import { FilesModule } from './admin/files/files.module';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { UsersModule } from './admin/users/users.module';
import { VisualModule } from './admin/visual/visual.module';
import { ConstructionModule } from './construction/construction.module';

@Module({
  imports: [
    AuthModule,
    AnnouncementsModule,
    FilesModule,
    DashboardModule,
    UsersModule,
    VisualModule,
    ConstructionModule,
    // 1. Structured Logging with PII Redaction
    WinstonModule.forRoot(loggerConfig),
    // 2. Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    // 3. Redis Caching
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
          },
        }),
      }),
    }),
    // 4. Background Job Queue
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  controllers: [AppController, AdminConfigController, AnalyticsController],
  providers: [AppService, MailProcessor],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 5. Global Audit Logging Middleware
    consumer.apply(AuditLogMiddleware).forRoutes('*');
  }
}
