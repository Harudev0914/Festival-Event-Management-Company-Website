import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { db, systemConfigs } from '@repo/db';
import { eq } from 'drizzle-orm';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assume guard exists
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';

@Controller('admin/config')
export class AdminConfigController {
  
  @Get('menu')
  async getMenuConfig() {
    const configs = await db.select().from(systemConfigs);
    // Transform to object for easier consumption
    return configs.reduce((acc, curr) => {
      acc[curr.key] = curr.value === 'true';
      return acc;
    }, {});
  }

  @Patch('menu')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async updateMenuConfig(@Body() body: Record<string, boolean>) {
    for (const [key, value] of Object.entries(body)) {
      await db
        .insert(systemConfigs)
        .values({ 
          key, 
          value: String(value),
          updatedAt: new Date()
        })
        .onConflictDoUpdate({
          target: systemConfigs.key,
          set: { value: String(value), updatedAt: new Date() },
        });
    }
    return { success: true };
  }
}
