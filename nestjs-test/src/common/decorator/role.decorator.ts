import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from '@/constant';

export const ROLES_KEY = 'role';
export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);
