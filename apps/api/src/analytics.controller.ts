import { Controller, Post, Body } from '@nestjs/common';
import { db, userSectionLogs } from '@repo/db';

@Controller('analytics')
export class AnalyticsController {
  @Post('section-log')
  async logSection(@Body() body: { 
    sectionId: string, 
    durationSeconds: number, 
    sessionId: string,
    userId?: string 
  }) {
    await db.insert(userSectionLogs).values({
      sectionId: body.sectionId,
      durationSeconds: body.durationSeconds,
      sessionId: body.sessionId,
      userId: body.userId || null,
      entryTime: new Date(Date.now() - (body.durationSeconds * 1000)),
      exitTime: new Date(),
    });
    
    return { success: true };
  }
}
