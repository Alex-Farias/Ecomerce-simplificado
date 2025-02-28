import { Chat } from "src/entity/chat.entity";

export interface chatHistory{
      id: number;
      chat: Chat;
      message: string;
      response: number;
      fovorite: boolean;
      midia: Buffer;
}