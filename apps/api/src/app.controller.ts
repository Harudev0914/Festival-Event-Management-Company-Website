import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { AppService } from './app.service';
import { APP_NAME } from '@repo/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
  ) {}

  @Get()
  getHello(): string {
    return `${APP_NAME} API is running!`;
  }

  // 4. Trigger Background Job
  @Get('trigger-job')
  async triggerJob() {
    const job = await this.mailQueue.add('send-welcome-email', {
      email: 'user@example.com',
      name: 'New User',
    });
    return { jobId: job.id, message: 'Job queued successfully' };
  }

  // 3. High Traffic Optimized Endpoint (Example)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('health-check')
  @CacheTTL(30) // Cache for 30 seconds
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: APP_NAME,
    };
  }
}
