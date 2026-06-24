import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';

@Controller('admin/announcements')
@UseGuards(RolesGuard)
@Roles('admin')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.announcementsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.announcementsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.announcementsService.delete(id);
  }
}
