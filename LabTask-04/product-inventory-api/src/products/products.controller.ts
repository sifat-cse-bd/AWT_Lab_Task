import { Controller, Post, Get, Body, Query, Param, ParseIntPipe, Patch, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async create(@Body()  dto:CreateProductDto){
    return await this.productsService.create(dto)
  }

  //getAllProducts
  @Get()
  async findAll(){
    return await this.productsService.findAll();
  }

  //search product by keywords
  @Get('search')
  async search(@Query('keyword') keyword: string | undefined)
  {
    return await this.productsService.search(keyword);
  }

  //search by category
  @Get('category/:cat')
  async findByCategory(@Param('cat') cat: string){
    return await this.productsService.findByCategory(cat);
  }

  //get one product by id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number){
    return await this.productsService.findOne(id);
  }

  //partial update by id and body
  @Patch(':id')
  async partialUpdate(@Param('id', ParseIntPipe) id: number, @Body()dto: PartialUpdateProductDto){
    return await this.productsService.partialUpdate(id, dto);
  }

  // full update/replace
  @Put(':id')
  async replace(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto){
    return await this.productsService.replace(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number){
    return await this.productsService.remove(id);
  }

  @Patch(':id/toggle')
  async toggleActive(@Param('id', ParseIntPipe) id: number){
    return await this.productsService.toggleActive(id);
  }
}
