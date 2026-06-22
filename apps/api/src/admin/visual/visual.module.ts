import { Module } from '@nestjs/common';
import { VisualController } from './visual.controller';
import { VisualService } from './visual.service';

@Module({
  controllers: [VisualController],
  providers: [VisualService],
})
export class VisualModule {}
