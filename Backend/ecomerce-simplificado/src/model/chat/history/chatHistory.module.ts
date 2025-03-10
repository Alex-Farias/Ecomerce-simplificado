import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BatePapoHistorico } from "src/entity/historico_chat.entity";
import { ChathistoryController } from "./chatHistory.controller";
import { ChatHistoryService } from "./chatHistory.service";

@Module({
    imports: [TypeOrmModule.forFeature([BatePapoHistorico])],
    providers: [ChatHistoryService],
    controllers: [ChathistoryController],
    exports: [ChatHistoryService],
})
export class ChatHistoryModule{}