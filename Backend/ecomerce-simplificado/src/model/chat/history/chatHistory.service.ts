import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { BatePapoHistorico } from "src/entity/historico_chat.entity";
import { Repository } from "typeorm";
import { ChatHistory } from "./chatHistory";
import { ChatHistoryDTO } from "./dto/chatHistory.dto";

@Injectable()
export class ChatHistoryService{
    constructor(@InjectRepository(BatePapoHistorico) private chatHistoryRepository: Repository<BatePapoHistorico>){}

    async findAll(): Promise<ChatHistoryDTO[]>{
        const histories = await this.chatHistoryRepository.find({ relations: ['batePapo'] });
        if (!histories || histories.length === 0) {throw new NotFoundException('')}
        return Promise.all(histories.map(history => this.convert(history, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<ChatHistoryDTO>{
        const history = await this.chatHistoryRepository.findOne({ where: { idBatePapoHistorico: id }, relations: ['batePapo'] });
        if (!history) {throw new NotFoundException('')}
        return this.convert(history, ConvertClass.DTO);
    }

    async create(chatHistoryDTO: ChatHistoryDTO): Promise<ChatHistoryDTO>{
        const e = await this.convert(chatHistoryDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cChatHistory = await this.chatHistoryRepository.save(e);
        return await this.findById(cChatHistory.idUsuario);
    }

    async update(chatDTO: ChatHistoryDTO): Promise<ChatHistoryDTO>{
        const e = await this.convert(chatDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uChatHistory = await this.chatHistoryRepository.save(e);
        return await this.findById(uChatHistory.idUsuario);
    }

    async disable(id: number): Promise<boolean>{
        const history = await this.chatHistoryRepository.delete(id);
        if(!history){throw new HttpException('Product not found', HttpStatus.NOT_FOUND)}
        return true;
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof BatePapoHistorico) {return obj}
                if(obj instanceof ChatHistory || obj instanceof ChatHistoryDTO){
                    let batePapo = new BatePapoHistorico()
                    batePapo.idBatePapoHistorico = obj.getId();
                    batePapo.batePapo = obj.getChat();
                    batePapo.mensagem = obj.getMessage();
                    batePapo.resposta = obj.getResponse();
                    batePapo.favorita = obj.getFavorite();
                    batePapo.midia = obj.getMidia();
                    return batePapo;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof BatePapoHistorico){
                    return new ChatHistory(
                        obj.idBatePapoHistorico,
                        obj.batePapo,
                        obj.mensagem,
                        obj.resposta,
                        obj.favorita,
                        obj.midia
                    );
                }

                if(obj instanceof ChatHistoryDTO) {
                    return new ChatHistory(
                        obj.getId(),
                        obj.getChat(),
                        obj.getMessage(),
                        obj.getResponse(),
                        obj.getFavorite(),
                        obj.getMidia()
                    )
                }

                if(obj instanceof ChatHistory){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof BatePapoHistorico){
                    return new ChatHistory(
                        obj.idBatePapoHistorico,
                        obj.batePapo,
                        obj.mensagem,
                        obj.resposta,
                        obj.favorita,
                        obj.midia
                    );
                }

                if(obj instanceof ChatHistory){
                    return new ChatHistoryDTO(
                        obj.getId(),
                        obj.getChat(),
                        obj.getMessage(),
                        obj.getResponse(),
                        obj.getFavorite(),
                        obj.getMidia()
                    )
                }

                if(obj instanceof ChatHistoryDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}