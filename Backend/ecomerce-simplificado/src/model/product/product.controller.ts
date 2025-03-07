import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDTO } from "./dto/product.dto";

@Controller('product')
export class ProductController{
    constructor(private productService: ProductService){}
    
    @Get('read')
        async findAll(): Promise<ProductDTO[]>{
        return this.productService.findAll();
    }

    @Get('read/:id')
        async findById(id: number): Promise<ProductDTO>{
        return this.productService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
        async create(@Body() prod: ProductDTO): Promise<ProductDTO>{
        return this.productService.create(prod);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
        async update(@Body() prod: ProductDTO): Promise<ProductDTO>{
        return this.productService.update(prod);
    }

    @Delete('delete/:id')
        async delete(id: number): Promise<ProductDTO>{
        return this.productService.disable(id);
    }
}