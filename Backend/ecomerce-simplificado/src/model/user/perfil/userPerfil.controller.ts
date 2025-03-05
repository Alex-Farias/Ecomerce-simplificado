import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserPerfilDTO } from "src/model/user/perfil/dto/userPerfil.dto";
import { UserPerfilService } from "src/model/user/perfil/userPerfil.service";

@Controller('user/perfil')
export class UserPerfilController{
    constructor(private readonly userPerfilService: UserPerfilService){}

    @Get('read/all')
    async findAll(): Promise<UserPerfilDTO[]>{
        return this.userPerfilService.findAll();
    }

    @Get('read/:id')
    async findById(@Param('id') id: number): Promise<UserPerfilDTO>{
        return this.userPerfilService.findById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() perfil: UserPerfilDTO): Promise<UserPerfilDTO>{
        return this.userPerfilService.create(perfil);
    }

    @Put('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Body() perfil: UserPerfilDTO): Promise<UserPerfilDTO>{
        return this.userPerfilService.update(perfil);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<UserPerfilDTO>{
        return this.userPerfilService.disable(id);
    }
}