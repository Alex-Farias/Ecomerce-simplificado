import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { UsuarioPerfil } from "src/entity/usuario_perfil.entity";
import { UserPerfilDTO } from "src/model/user/perfil/dto/userPerfil.dto";
import { Repository } from "typeorm";
import { UserPerfil } from "./userPerfil";

@Injectable()
export class UserPerfilService{
    constructor(
        @InjectRepository(UsuarioPerfil) private userPerfilRepository: Repository<UsuarioPerfil>
    ){}

    async findAll(): Promise<UserPerfilDTO[]>{
        const perfils = await this.userPerfilRepository.find();
        if (!perfils || perfils.length === 0) {throw new NotFoundException('')}
        return Promise.all(perfils.map(perfil => this.convert(perfil, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<UserPerfilDTO>{
        const perfil = await this.userPerfilRepository.findOne({ where: { idPerfil: id } });
        if(!perfil){throw new NotFoundException('')}
        return this.convert(perfil, ConvertClass.DTO);
    }

    async create(perfilDTO: UserPerfilDTO): Promise<UserPerfilDTO> {
        const e = await this.convert(perfilDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cPerfil = await this.userPerfilRepository.save(e);
        return await this.findById(cPerfil.idPerfil);
    }

    async update(perfilDTO: UserPerfilDTO): Promise<UserPerfilDTO> {
        const e = await this.convert(perfilDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uPerfil = await this.userPerfilRepository.save(e);
        return await this.findById(uPerfil.idPerfil);
    }

    async disable(id: number): Promise<UserPerfilDTO>{
        const perfilDTO = await this.findById(id);
        if (!perfilDTO) {throw new NotFoundException('DEU RUIM AQUI?' + perfilDTO)}
        perfilDTO.setIsActive(false);

        const e = await this.convert(perfilDTO, ConvertClass.ENTITY);
        const uPerfil = await this.userPerfilRepository.save(e);
        return await this.findById(uPerfil.idPerfil);
    }
    
    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof UsuarioPerfil) {return obj}
                if(obj instanceof UserPerfil || obj instanceof UserPerfilDTO){
                    let user = new UsuarioPerfil()
                    user.idPerfil = obj.getId();
                    user.descricao = obj.getDescription();
                    user.ativo = obj.getIsActive();
                    return user;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof UsuarioPerfil){
                    return new UserPerfil(
                        obj.idPerfil,
                        obj.descricao,
                        obj.ativo
                    );
                }

                if(obj instanceof UserPerfilDTO) {
                    return new UserPerfil(
                        obj.getId(),
                        obj.getDescription(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof UserPerfil){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof UsuarioPerfil){
                    return new UserPerfil(
                        obj.idPerfil,
                        obj.descricao,
                        obj.ativo
                    );
                }

                if(obj instanceof UserPerfil){
                    return new UserPerfilDTO(
                        obj.getId(),
                        obj.getDescription(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof UserPerfilDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}