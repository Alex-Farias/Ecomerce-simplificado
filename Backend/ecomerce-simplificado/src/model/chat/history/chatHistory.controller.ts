import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ChatHistoryService } from "./chatHistory.service";
import { ChatHistoryDTO } from "./dto/chatHistory.dto";

@Controller('chat/history')
export class ChathistoryController{
    constructor(private readonly chatHistoryService: ChatHistoryService){}

    @Get('read')
    async findAll(): Promise<ChatHistoryDTO[]>{
        return this.chatHistoryService.findAll();
    }

    @Get('read/:id')
    async findById(id: number): Promise<ChatHistoryDTO>{
        return this.chatHistoryService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() chatHistory: ChatHistoryDTO): Promise<ChatHistoryDTO>{
        return this.chatHistoryService.create(chatHistory);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() chatHistory: ChatHistoryDTO): Promise<ChatHistoryDTO>{
        return this.chatHistoryService.update(chatHistory);
    }

    @Delete('delete/:id')
    async delete(id: number): Promise<boolean>{
        return this.chatHistoryService.disable(id);
    }
}