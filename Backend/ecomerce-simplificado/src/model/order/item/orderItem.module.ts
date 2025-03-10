import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PedidoItem } from "src/entity/pedido_item.entity";
import { OrderItemController } from "./orderItem.controller";
import { OrderItemService } from "./orderItem.service";

@Module({
    imports: [TypeOrmModule.forFeature([PedidoItem])],
    providers: [OrderItemService],
    controllers: [OrderItemController],
    exports: [OrderItemService],
})
export class OrderItemModule{}