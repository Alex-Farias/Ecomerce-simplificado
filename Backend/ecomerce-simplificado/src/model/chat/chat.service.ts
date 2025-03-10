import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { BatePapo } from "src/entity/chat.entity";
import { Repository } from "typeorm";
import { Chat } from "./chat";
import { ChatDTO } from "./dto/chat.dto";
import { ChatHistoryService } from "./history/chatHistory.service";

@Injectable()
export class ChatService{
    constructor(
        @InjectRepository(BatePapo) 
        private chatRepository: Repository<BatePapo>,
        private chatHistoryService: ChatHistoryService
    ){}

    async findAll(): Promise<ChatDTO[]>{
        const chats = await this.chatRepository.find({ relations: ['usuario1', 'usuario2'] });
        if (!chats || chats.length === 0) {throw new NotFoundException('')}
        return Promise.all(chats.map(chat => this.convert(chat, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<ChatDTO>{
        const chat = await this.chatRepository.findOne({ where: { idBatePapo: id }, relations: ['usuario1', 'usuario2'] });
        if (!chat) {throw new NotFoundException('')}
        return this.convert(chat, ConvertClass.DTO);
    }

    async create(chatDTO: ChatDTO): Promise<ChatDTO>{
        const e = await this.convert(chatDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cChat = await this.chatRepository.save(e);
        return await this.findById(cChat.idUsuario);
    }

    async update(chatDTO: ChatDTO): Promise<ChatDTO>{
        const e = await this.convert(chatDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uChat = await this.chatRepository.save(e);
        return await this.findById(uChat.idUsuario);
    }

    async disable(id: number): Promise<ChatDTO>{
        const chatDTO = await this.findById(id);
        if (!chatDTO) {throw new NotFoundException('')}
        chatDTO.setIsActive(false);

        const e = await this.convert(chatDTO, ConvertClass.ENTITY);
        const uChat = await this.chatRepository.save(e);
        return await this.findById(uChat.idUsuario);
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof BatePapo) {return obj}
                if(obj instanceof Chat || obj instanceof ChatDTO){
                    let batePapo = new BatePapo()
                    batePapo.idBatePapo = obj.getId();
                    batePapo.usuario1 = obj.getUser1();
                    batePapo.usuario2 = obj.getUser2();
                    batePapo.descricao = obj.getDescription();
                    batePapo.ativo = obj.getIsActive();
                    return batePapo;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof BatePapo){
                    return new Chat(
                        obj.idBatePapo,
                        obj.usuario1,
                        obj.usuario2,
                        obj.descricao,
                        obj.ativo,
                    );
                }

                if(obj instanceof ChatDTO) {
                    return new Chat(
                        obj.getId(),
                        obj.getUser1(),
                        obj.getUser2(),
                        obj.getDescription(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof Chat){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof BatePapo){
                    return new Chat(
                        obj.idBatePapo,
                        obj.usuario1,
                        obj.usuario2,
                        obj.descricao,
                        obj.ativo
                    );
                }

                if(obj instanceof Chat){
                    return new ChatDTO(
                        obj.getId(),
                        obj.getUser1(),
                        obj.getUser2(),
                        obj.getDescription(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof ChatDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}