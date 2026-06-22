import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VisualService } from './visual.service';

export interface MainVisualDto {
  backgroundType: 'image_file' | 'image_url' | 'video_file' | 'video_url';
  backgroundValue: string;
  djImageType: 'image_file' | 'image_url' | 'video_file' | 'video_url';
  djImageValue: string;
  detailContent: string;
  useTimestamp: boolean;
  timestampDate?: string;
}

@Controller('admin/visual')
export class VisualController {
  constructor(private readonly visualService: VisualService) {}

  @Get()
  findAll() {
    return this.visualService.findAll();
  }

  @Post()
  create(@Body() createDto: MainVisualDto) {
    return this.visualService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: MainVisualDto) {
    return this.visualService.update(Number(id), updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visualService.remove(Number(id));
  }
}
