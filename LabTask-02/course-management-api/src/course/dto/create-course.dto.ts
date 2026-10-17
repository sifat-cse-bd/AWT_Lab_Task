import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto{
    @IsString()
    @IsNotEmpty({message: 'Please enter course name'})
    name: string;

    @IsString()
    @IsNotEmpty({message: 'Please enter course code'})
    @Matches(/^[A-Z]{2,3}[1-9]{3}$/, {
        message: 'Please enter valide course code e.g CS101'
    })
    code: string;
    @IsString()
    @IsNotEmpty({message: 'Please enter instructor name'})
    instructor: string;

    @Type(() => Number)
    @IsNotEmpty({message: 'Please enter credit'})
    @Matches(/^[1-6]{1}$/, {message: 'Please enter valid credit e.g. 3'})
    credit: number;

    
    @IsString()
    description: string;
}