import { NotFoundException } from "@nestjs/common";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserPerfilController } from "src/model/user/perfil/userPerfil.controller";
import { UserPerfil } from "src/model/user/perfil/userPerfil";
import { UserPerfilEnum } from "src/model/user/perfil/enum/userPerfilEnum";
import { UsuarioPerfil } from "src/entity/usuario_perfil.entity";

export class UserPerfilDTO{
    @IsOptional()
    @IsInt()
    id: number;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    constructor(
        id: number,
        description: string,
        isActive: boolean
    ){
        this.id = id;
        this.description = description;
        this.isActive = isActive;
    }

    public getId(){return this.id}
    public getDescription(){return this.description}
    public getIsActive(){return this.isActive}

    public setId(id: number){this.id = id}
    public setDescription(description: string){this.description = description}
    public setIsActive(isActive: boolean){this.isActive = isActive}
}