import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto{
    @IsString()
    @IsNotEmpty({message: 'Please enter course name'})
    name: string;

    @IsString()
    @IsNotEmpty({message: 'Please enter course code'})
    @Matches(/^[A-Z]{2,3}[0-9]{3}$/, {
        message: 'Please enter valid course code e.g CS101'
    })
    code: string;
    @IsString()
    @IsNotEmpty({message: 'Please enter instructor name'})
    instructor: string;

    @Type(() => Number)
    @IsNotEmpty({message: 'Please enter credits'})
    @IsNumber({}, { message: 'Credits must be a number' })
    @Min(1, { message: 'Credits must be at least 1' })
    @Max(6, { message: 'Credits must be at most 6' })
    credits: number;

    
    @IsString()
    @IsOptional()
    description?: string;
}