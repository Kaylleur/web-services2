import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
    @ApiProperty({
        description: 'The name of the course',
        example: 'Math 101'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The description of the course',
        example: 'Introduction to math',
        nullable: true
    })
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'The start date of the course',
        example: '2020-01-01'
    })
    @IsDateString()
    startDate: string;

    @ApiProperty({
        description: 'The end date of the course',
        example: '2020-02-01'
    })
    @IsDateString()
    endDate: string;
}
