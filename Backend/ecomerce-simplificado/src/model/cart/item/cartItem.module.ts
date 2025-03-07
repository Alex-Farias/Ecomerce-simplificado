import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarrinhoItem } from "src/entity/carrinhoItem.entity";
import { CartItemController } from "./cartItem.controller";
import { CartItemService } from "./cartItem.service";

@Module({
    imports: [TypeOrmModule.forFeature([CarrinhoItem])],
    providers: [CartItemService],
    controllers: [CartItemController],
    exports: [CartItemService],
})
export class CartItemModule{}