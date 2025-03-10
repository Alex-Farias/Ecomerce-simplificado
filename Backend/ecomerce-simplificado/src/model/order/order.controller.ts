import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderDTO } from "./dto/order.dto";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController{
    constructor(private readonly orderService: OrderService){}

    @Get('read')
    async findAll(): Promise<OrderDTO[]>{
        return this.orderService.findAll();
    }

    @Get('read/:id')
    async findById(id: number): Promise<OrderDTO>{
        return this.orderService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() order: OrderDTO): Promise<OrderDTO>{
        return this.orderService.create(order);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() order: OrderDTO): Promise<OrderDTO>{
        return this.orderService.update(order);
    }

    @Delete('delete/:id')
    async delete(id: number): Promise<boolean>{
        return this.orderService.disable(id);
    }
}