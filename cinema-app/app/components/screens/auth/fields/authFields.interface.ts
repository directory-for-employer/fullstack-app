import { Control } from 'react-hook-form'
import { IAuthFormData } from '@/shared/types/auth.interface'

export interface IAuthFields {
	control: Control<IAuthFormData>
	isPassRequired?: boolean
}
