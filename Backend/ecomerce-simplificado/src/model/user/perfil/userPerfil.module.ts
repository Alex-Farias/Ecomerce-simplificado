import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioPerfil } from "src/entity/usuario_perfil.entity";
import { UserPerfilController } from "./userPerfil.controller";
import { UserPerfilService } from "./userPerfil.service";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioPerfil])],
    providers: [UserPerfilService],
    controllers: [UserPerfilController],
    exports: [UserPerfilService],
})
export class UserPerfilModule {}
  