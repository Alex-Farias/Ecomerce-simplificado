import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/entity/usuario.entity";
import { UserPerfilModule } from "./perfil/userPerfil.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    UserPerfilModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
  