import { Injectable } from '@nestjs/common';
import { db } from '@repo/db';
import { users } from '@repo/db/src/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async findAll() {
    return await db.select().from(users);
  }

  async delete(id: string) {
    return await db.delete(users).where(eq(users.id, id));
  }
}
