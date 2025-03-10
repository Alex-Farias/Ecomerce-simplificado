import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderItemDTO } from "./dto/orderItem.dto";
import { OrderItemService } from "./orderItem.service";

@Controller('order/item')
export class OrderItemController{
    constructor(private readonly orderItemService: OrderItemService){}

    @Get('read')
    async findAll(): Promise<OrderItemDTO[]>{
        return this.orderItemService.findAll();
    }

    @Get('read/:id')
    async findById(id: number): Promise<OrderItemDTO>{
        return this.orderItemService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() orderItem: OrderItemDTO): Promise<OrderItemDTO>{
        return this.orderItemService.create(orderItem);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() orderItem: OrderItemDTO): Promise<OrderItemDTO>{
        return this.orderItemService.update(orderItem);
    }

    @Delete('delete/:id')
    async delete(id: number): Promise<OrderItemDTO>{
        return this.orderItemService.disable(id);
    }
}