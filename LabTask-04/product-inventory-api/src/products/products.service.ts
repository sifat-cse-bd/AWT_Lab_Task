import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productsRepo: Repository<Products>,
    ) { }

    //create a product
    async create(dto: CreateProductDto) {
        const product = this.productsRepo.create(dto);
        const savedProduct = await this.productsRepo.save(product);
        return {
            message: 'Product created successfully',
            data: savedProduct,
        };
    }

    //return all products ordered by createdAt DESC
    async findAll() {
        const [products, count] = await this.productsRepo.findAndCount({ order: { createdAt: 'DESC' } });
        const organizedProducs = products.map(p => ({
           id: p.id,
           name: p.name,
           description: p.description,
           price: p.price,
           stock: p.stock,
           category: p.category,
           isActive: p.isActive,
           createdDate: p.createdAt,
           updatedDate: p.updatedAt,
        }
        ));
        return {
            message: 'Products found successfully',
            count: count,
            data: organizedProducs,
        };
    }

    //find a product by id, throw 404 if not found
    async findOne(id: number) {
        const product = await this.productsRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return {
            message: 'Product found successfully',
            data: product,
        };
    }

    //partial update a product fields (PATCH)
    async partialUpdate(id: number, dto: PartialUpdateProductDto) {
        const product = await this.productsRepo.preload({ id, ...dto });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        const updatedProduct = await this.productsRepo.save(product);
        return {
            message: 'Product updated successfully',
            data: updatedProduct,
        };

    }

    //replace full product by id
    async replace(id: number, dto: UpdateProductDto) {
        await this.findOne(id); // Check if exists, throws 404 if not
        const product = this.productsRepo.create({
            id,
            ...dto,
            description: dto.description ?? (null as any), // not sent = reset
            stock: dto.stock ?? 0,
            isActive: dto.isActive ?? true,
        });
        const updatedProduct = await this.productsRepo.save(product);
        return {
            message: 'Product replaced successfully',
            data: updatedProduct,
        };
    }

    //delete a product by id
    async remove(id: number) {
        const result = await this.findOne(id);
        if (!result) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        else {
            const affected = await this.productsRepo.delete(id);
            if (affected.affected === 0) {
                return {
                    message: 'Product does not deleted',
                };
            }
            return {
                message: 'Product deleted successfully',
                id: id,
            }

        }
    }

    //find products by category
    async findByCategory(category: string) {
        const [products, count] = await this.productsRepo.findAndCount({ where: { category } });
        if(count === 0)
        {
             return { message: `No product found by the category: ${category}` };
        }
        return {
            message: 'Products found successfully',
            count: count,
            data: products,
        };
    }

    //search products by name
    async search(keyword: string | undefined) {
        const normalizedKeyword = keyword?.trim();
        if (!normalizedKeyword) {
            throw new BadRequestException('Search keyword must not be empty');
        }

        const [products, count] = await this.productsRepo.findAndCount({ where: { name: ILike(`%${normalizedKeyword}%`) } });
        return {
            message: count === 0
                ? `No products found for keyword: ${normalizedKeyword}`
                : 'Products found successfully',
            count: count,
            data: products,
        };
    }

    //toggle active
    async toggleActive(id: number) {
        const product = await this.productsRepo.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        product.isActive = !product.isActive;
        return {
            message: 'Product active status toggled successfully',
            data: await this.productsRepo.save(product),
        };
    }
}