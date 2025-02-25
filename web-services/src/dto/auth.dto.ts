import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginQueryDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'thomas@email.fr'
    })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'password'
    })
    @IsNotEmpty()
    password: string;
}