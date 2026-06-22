import { Injectable } from '@nestjs/common';
import { db, announcements } from '@repo/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class AnnouncementsService {
  async findAll() {
    return await db.select().from(announcements);
  }

  async create(data: typeof announcements.$inferInsert) {
    return await db.insert(announcements).values(data);
  }

  async update(id: number, data: typeof announcements.$inferInsert) {
    return await db.update(announcements).set(data).where(eq(announcements.id, id));
  }

  async delete(id: number) {
    return await db.delete(announcements).where(eq(announcements.id, id));
  }
}
