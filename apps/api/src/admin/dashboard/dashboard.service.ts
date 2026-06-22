import { Injectable } from '@nestjs/common';
import { db } from '@repo/db';
import { users, events, rentalOrders } from '@repo/db/src/schema';
import { count, sum, sql } from 'drizzle-orm';

@Injectable()
export class DashboardService {
  async getStats() {
    const userCount = await db.select({ count: count() }).from(users);
    const eventCount = await db.select({ count: count() }).from(events);
    const revenue = await db.select({ total: sum(rentalOrders.totalPrice) }).from(rentalOrders);

    return {
      users: userCount[0].count,
      events: eventCount[0].count,
      revenue: revenue[0].total || 0,
    };
  }
}
