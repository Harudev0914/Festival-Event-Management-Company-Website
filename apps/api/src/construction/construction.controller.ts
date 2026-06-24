import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('construction')
export class ConstructionController {
  constructor(private readonly constructionService: ConstructionService) {}

  @Get('questions')
  async getQuestions() {
    return await this.constructionService.getQuestions();
  }

  @Post('questions')
  async createQuestion(@Body() questionData: any) {
    return await this.constructionService.createQuestion(questionData);
  }

  @Post('questions/update')
  async updateQuestion(@Body() questionData: any) {
    return await this.constructionService.updateQuestion(questionData);
  }

  @Get('admin/list')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getAllConsultations() {
    return await this.constructionService.getAllConsultations();
  }
}
