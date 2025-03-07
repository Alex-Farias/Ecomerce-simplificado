import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductCategoryDTO } from "./dto/productCategory.dto";
import { ProductCategoryService } from "./productCategory.service";

@Controller('product/category')
export class ProductCategoryController{
    constructor(private productCategoryService: ProductCategoryService){}

    @Get('read/all')
    async findAll(): Promise<ProductCategoryDTO[]>{
        return this.productCategoryService.findAll();
    }

    @Get('read/:id')
    async findById(@Param('id') id: number): Promise<ProductCategoryDTO>{
        return this.productCategoryService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() prodCat: ProductCategoryDTO): Promise<ProductCategoryDTO>{
        return this.productCategoryService.create(prodCat);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() prodCat: ProductCategoryDTO): Promise<ProductCategoryDTO>{
        return this.productCategoryService.update(prodCat);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<ProductCategoryDTO>{
        return this.productCategoryService.disable(id);
    }
}