import { UseGuards, applyDecorators } from '@nestjs/common'
import { TypeRole } from '../interface/auth.interface'
import { JwtAuthGuard } from '../guard/jwt-auth.guard'
import { OnlyAdminGuard } from '../guard/admin.guard'

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard),
	)
