import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserDTO } from "src/model/user/dto/user.dto";
import { UserService } from "src/model/user/user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get('read')
    async findAll(): Promise<UserDTO[]>{
        return this.userService.findAll();
    }

    @Get('read/:id')
    async findById(id: number): Promise<UserDTO>{
        return this.userService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() user: UserDTO): Promise<UserDTO>{
        return this.userService.create(user);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() user: UserDTO): Promise<UserDTO>{
        return this.userService.update(user);
    }

    @Delete('delete/:id')
    async delete(id: number): Promise<UserDTO>{
        return this.userService.disable(id);
    }
}