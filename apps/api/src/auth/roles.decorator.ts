import { SetMetadata } from '@nestjs/common';
import { userRoleEnum } from '@repo/db';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (typeof userRoleEnum.enumValues[number])[]) => SetMetadata(ROLES_KEY, roles);
