import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatDTO } from "./dto/chat.dto";

@Controller('chat')
export class ChatController{
    constructor(private readonly chatService: ChatService){}

    @Get('read')
    async findAll(): Promise<ChatDTO[]>{
        return this.chatService.findAll();
    }

    @Get('read/:id')
    async findById(id: number): Promise<ChatDTO>{
        return this.chatService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() chatDTO: ChatDTO): Promise<ChatDTO>{
        return this.chatService.create(chatDTO);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() chatDTO: ChatDTO): Promise<ChatDTO>{
        return this.chatService.update(chatDTO);
    }

    @Delete('delete/:id')
    async delete(id: number): Promise<ChatDTO>{
        return this.chatService.disable(id);
    }
}