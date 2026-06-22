import { Controller, Post, UseInterceptors, UploadedFile, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';

@Controller('admin/files')
@UseGuards(RolesGuard)
@Roles('admin')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // In a real scenario, you'd upload to S3/Cloud Storage here.
    // For now, storing metadata assuming local storage/path.
    return await this.filesService.saveFileMetadata({
      fileName: file.originalname,
      fileUrl: `/uploads/${file.filename}`, // Mock path
      fileType: file.mimetype,
      size: file.size,
    });
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }
}
