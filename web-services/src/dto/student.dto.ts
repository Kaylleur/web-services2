import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
    @ApiProperty({
        description: 'The first name of the student',
        example: 'Thomas'
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        description: 'The last name of the student',
        example: 'Anderson'
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description: 'The email of the student',
        example: 'thomas@email.fr'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password to create',
        example: 'password'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
