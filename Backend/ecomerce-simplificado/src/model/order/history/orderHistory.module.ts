import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PedidoHistorico } from "src/entity/historico_pedido.entity";
import { OrderHistoryController } from "./orderHistory.controller";
import { OrderHistoryService } from "./orderHistory.service";

@Module({
    imports: [TypeOrmModule.forFeature([PedidoHistorico])],
    providers: [OrderHistoryService],
    controllers: [OrderHistoryController],
    exports: [OrderHistoryService],
})
export class OrderHistoryModule{}