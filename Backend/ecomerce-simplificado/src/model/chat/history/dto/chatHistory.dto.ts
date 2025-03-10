import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ChatHistoryDTO{
    @IsOptional()
    @IsInt()
    id: number;
    @IsNotEmpty()
    @IsInt()
    chat: number;
    @IsNotEmpty()
    @IsString()
    message: string;
    @IsOptional()
    @IsInt()
    response: number;
    @IsOptional()
    @IsBoolean()
    favorite: boolean;
    @IsOptional()
    @IsString()
    midia: Buffer;

    constructor(id: number,
                chat: number,
                message: string,
                response: number,
                favorite: boolean,
                midia: Buffer)
    {
        this.id = id;
        this.chat = chat;
        this.message = message;
        this.response = response;
        this.favorite = favorite;
        this.midia = midia;
    }

    public getId(): number{return this.id!}
    public getChat(): number{return this.chat!}
    public getMessage(): string{return this.message!}
    public getResponse(): number{return this.response!}
    public getFavorite(): boolean{return this.favorite!}
    public getMidia(): Buffer{return this.midia!}

    public setId(id: number){this.id = id}
    public setChat(chat: number){this.chat = chat}
    public setMessage(message: string){this.message = message}
    public setResponse(response: number){this.response = response}
    public setFavorite(favorite: boolean){this.favorite = favorite}
    public setMidia(midia: Buffer){this.midia = midia}
}