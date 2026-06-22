import { Injectable } from '@nestjs/common';
// import { db } from '../../../db'; // Assuming db connection is available
// import { mainVisualItems } from '../../../db/schema';
// import { eq } from 'drizzle-orm';

@Injectable()
export class VisualService {
  findAll() {
    // return db.select().from(mainVisualItems);
    return [{ id: 1, title: 'MIDNIGHT CITY FESTIVAL 2026', deadline: '2026-07-12', regDate: '2026-06-01', useTimestamp: true, status: 1 }];
  }

  create(createDto: any) {
    return { id: 3, ...createDto };
  }

  update(id: number, updateDto: any) {
    return { id, ...updateDto };
  }

  remove(id: number) {
    return { success: true, id };
  }
}
