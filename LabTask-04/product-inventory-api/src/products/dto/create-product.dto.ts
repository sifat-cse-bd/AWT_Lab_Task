import { IsNotEmpty, IsOptional, IsString, IsNumber, IsPositive, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
export  class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    price: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    stock: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}