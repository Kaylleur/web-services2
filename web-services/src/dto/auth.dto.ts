import { IsNotEmpty } from 'class-validator';

export class LoginQueryDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}