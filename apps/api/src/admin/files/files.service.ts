import { Injectable } from '@nestjs/common';
import { db } from '@repo/db';
import { fileAssets } from '@repo/db/src/schema';

@Injectable()
export class FilesService {
  async saveFileMetadata(data: typeof fileAssets.$inferInsert) {
    return await db.insert(fileAssets).values(data);
  }

  async findAll() {
    return await db.select().from(fileAssets);
  }
}
