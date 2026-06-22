import { Injectable } from '@nestjs/common';
import { db, fileAssets } from '@repo/db';

@Injectable()
export class FilesService {
  async saveFileMetadata(data: typeof fileAssets.$inferInsert) {
    return await db.insert(fileAssets).values(data);
  }

  async findAll() {
    return await db.select().from(fileAssets);
  }
}
