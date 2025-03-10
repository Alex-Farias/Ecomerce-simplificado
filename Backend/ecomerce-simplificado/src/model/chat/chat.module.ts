import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BatePapo } from "src/entity/chat.entity";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatHistoryModule } from "./history/chatHistory.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([BatePapo]),
        ChatHistoryModule,
    ],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [ChatService],
})
export class ChatModule{}