import { UserPerfilDTO } from "src/model/user/perfil/dto/userPerfil.dto";
import { UserPerfilInterface } from "./interface/userPerfil.interface";

export class UserPerfil implements UserPerfilInterface{
    id: number;
    description: string;
    isActive: boolean;

    constructor(id: number,
                description: string,
                isActive: boolean){
        this.id = id;
        this.description = description;
        this.isActive = isActive;
    }

    public static fromDTO(dto: UserPerfilDTO): UserPerfil{
        return new UserPerfil(dto.id,
                              dto.description,
                              dto.isActive)
    }

    public getId(){return this.id}
    public getDescription(){return this.description}
    public getIsActive(){return this.isActive}

    public setId(id: number){this.id = id}
    public setDescription(description: string){this.description = description}
    public setIsActive(isActive: boolean){this.isActive = isActive}
}