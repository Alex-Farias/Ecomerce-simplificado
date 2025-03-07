import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Carrinho } from "src/entity/carrinho.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { CartItemModule } from "./item/cartItem.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Carrinho]),
        CartItemModule,
    ],
    providers: [CartService],
    controllers: [CartController],
    exports: [CartService],
})
export class CartModule{}