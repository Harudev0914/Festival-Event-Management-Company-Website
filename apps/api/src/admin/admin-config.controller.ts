import { Controller, Get, Patch, Body, UseGuards, Param, Post } from '@nestjs/common';
import { db, systemConfigs } from '@repo/db';
import { eq } from 'drizzle-orm';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assume guard exists
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';

@Controller('admin/config')
export class AdminConfigController {
  
  // Generic GET to fetch any config
  @Get(':key')
  async getConfig(@Param('key') key: string) {
    const [config] = await db
      .select()
      .from(systemConfigs)
      .where(eq(systemConfigs.key, key));
    
    if (!config) return { key, value: null };
    
    // Attempt to parse JSON if possible, otherwise return raw string
    try {
      return { key, value: JSON.parse(config.value) };
    } catch {
      return { key, value: config.value };
    }
  }

  // Generic POST to update any config
  @Post(':key')
  async updateConfig(@Param('key') key: string, @Body() body: { value: any }) {
    const valueString = typeof body.value === 'object' 
      ? JSON.stringify(body.value) 
      : String(body.value);

    await db
      .insert(systemConfigs)
      .values({ 
        key, 
        value: valueString,
        updatedAt: new Date()
      })
      .onConflictDoUpdate({
        target: systemConfigs.key,
        set: { value: valueString, updatedAt: new Date() },
      });
      
    return { success: true };
  }
}
