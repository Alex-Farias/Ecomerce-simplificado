import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CartItemService } from "./cartItem.service";
import { CartItemDTO } from "./dto/cartItem.dto";

@Controller('cart/item')
export class CartItemController{
    constructor(private cartItemService: CartItemService){}

    @Get('read/all')
    async findAll(): Promise<CartItemDTO[]>{
        return this.cartItemService.findAll();
    }

    @Get('read/:id')
    async findById(@Param('id') id: number): Promise<CartItemDTO>{
        return this.cartItemService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() cartItem: CartItemDTO): Promise<CartItemDTO>{
        return this.cartItemService.create(cartItem);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() cartItem: CartItemDTO): Promise<CartItemDTO>{
        return this.cartItemService.update(cartItem);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<boolean>{
        return this.cartItemService.disable(id);
    }
}