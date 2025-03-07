import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDTO } from "./dto/cart.dto";

@Controller('cart')
export class CartController{
    constructor(private readonly cartService: CartService){}

    @Get('read')
    async findAll(): Promise<CartDTO[]>{
        return this.cartService.findAll();
    }

    @Get('read/:id')
    async findById(id: number): Promise<CartDTO>{
        return this.cartService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() cart: CartDTO): Promise<CartDTO>{
        return this.cartService.create(cart);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() cart: CartDTO): Promise<CartDTO>{
        return this.cartService.update(cart);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<boolean>{
        console.log('controller: ' + id);
        return this.cartService.disable(id);
    }
}