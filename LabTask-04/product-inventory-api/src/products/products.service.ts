import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entities/products.entity.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productsRepo: Repository<Products>,
    ) { }

    
}
