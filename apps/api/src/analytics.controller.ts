import { Controller, Post, Body } from '@nestjs/common';
import { db } from '@repo/db';

@Controller('analytics')
export class AnalyticsController {
  @Post('section-log')
  async logSection(@Body() body: any) {
    // 임시로 로그만 남기고 DB 저장 로직은 DB 스키마 수정 후 구현
    console.log('Analytics log received:', body);
    return { success: true };
  }
}
