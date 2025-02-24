import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
}
