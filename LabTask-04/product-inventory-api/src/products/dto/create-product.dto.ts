import { IsNotEmpty, IsOptional, IsString, IsNumber, IsPositive, IsBoolean, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name should not be empty' })
    @Matches(/\S/, { message: 'Name must contain a non-whitespace character' })
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber({}, { message: 'price must be a number' })
    @IsPositive({ message: 'price must be a positive number' })
    @Type(() => Number)
    price: number;

    @IsNumber({}, { message: 'Stock must be a valid number' })
    @IsNotEmpty({ message: 'Stock is required' })
    @IsPositive({ message: 'Stock must be positive' })
    @Type(() => Number)
    stock: number;

    @IsString()
    @IsNotEmpty({ message: 'Category is required' })
    @Matches(/\S/, { message: 'Category must contain a non-whitespace character' })
    category: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
