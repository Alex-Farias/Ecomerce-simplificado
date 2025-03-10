import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderHistoryDTO } from "./dto/orderHistory.dto";
import { OrderHistoryService } from "./orderHistory.service";

@Controller('order/history')
export class OrderHistoryController{
    constructor(private readonly orderHistoryService: OrderHistoryService){}

    @Get('read')
    async findAll(): Promise<OrderHistoryDTO[]>{
        return this.orderHistoryService.findAll();
    }

    @Get('read/:id')
    async findById(id: number): Promise<OrderHistoryDTO>{
        return this.orderHistoryService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() orderHistory: OrderHistoryDTO): Promise<OrderHistoryDTO>{
        return this.orderHistoryService.create(orderHistory);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() orderHistory: OrderHistoryDTO): Promise<OrderHistoryDTO>{
        return this.orderHistoryService.update(orderHistory);
    }

    @Delete('delete/:id')
    async delete(id: number): Promise<OrderHistoryDTO>{
        return this.orderHistoryService.disable(id);
    }
}