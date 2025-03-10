import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pedido } from "src/entity/pedido.entity";
import { OrderHistoryModule } from "./history/orderHistory.module";
import { OrderItemModule } from "./item/orderItem.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Pedido]),
        OrderItemModule,
        OrderHistoryModule,
    ],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService],
})
export class OrderModule{}