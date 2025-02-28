import { Injectable, OnModuleInit } from "@nestjs/common";
import { UserDTO } from "src/model/user/dto/user.dto";
import { User } from "src/model/user/user";
import { UserPerfilEnum } from "src/model/user/perfil/enum/userPerfilEnum";
import { UserService } from "../model/user/user.service";
import { UserPerfilService } from "../model/user/perfil/userPerfil.service";

@Injectable()
export class DBService implements OnModuleInit{
    constructor(private readonly userService: UserService,
                private readonly userPerfilService: UserPerfilService,
    ){}

    async onModuleInit(){}
}