import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('mail-queue')
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    
    // Simulate heavy task (e.g., sending email)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    this.logger.log(`Completed job ${job.id}`);
    return { sent: true };
  }
}
