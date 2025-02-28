import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioPerfil } from "src/entity/usuario_perfil.entity";
import { UserPerfilDTO } from "src/model/user/perfil/dto/userPerfil.dto";
import { Repository } from "typeorm";

@Injectable()
export class UserPerfilService{
    constructor(
        @InjectRepository(UsuarioPerfil) private userPerfilRepository: Repository<UsuarioPerfil>
    ){}

    async findAll(): Promise<UserPerfilDTO[]>{
        const perfils = await this.userPerfilRepository.find();
        if (!perfils || perfils.length === 0) {throw new NotFoundException('')}
        return perfils.map((perfil: UsuarioPerfil) => UserPerfilDTO.fromEntity(perfil));
    }

    async findById(id: number): Promise<UserPerfilDTO>{
        const perfil = await this.userPerfilRepository.findOne({ where: { idPerfil: id } });
        if(!perfil){throw new NotFoundException('')}
        const perfilDTO = UserPerfilDTO.fromEntity(perfil);
        return perfilDTO;
    }

    async create(perfil: UserPerfilDTO): Promise<UserPerfilDTO> {
        const perfilEntity = await this.convertDTOtoEntity(perfil);
        const newPerfil = await this.userPerfilRepository.save(perfilEntity);
        if(!newPerfil){throw new NotFoundException('')}
        const perfilDTO = UserPerfilDTO.fromEntity(newPerfil);
        return perfilDTO;
    }

    async update(perfil: UserPerfilDTO): Promise<UserPerfilDTO> {
        const perfilEntity = await this.convertDTOtoEntity(perfil);
        const updatedPerfil = await this.userPerfilRepository.save(perfilEntity);
        if(!updatedPerfil){throw new NotFoundException('')}
        const perfilDTO = UserPerfilDTO.fromEntity(updatedPerfil);
        return perfilDTO;
    }

    async disable(id: number): Promise<UserPerfilDTO>{
        const perfil = await this.userPerfilRepository.findOne({ where: { idPerfil: id } });
        if(!perfil){throw new NotFoundException('')}

        perfil.ativo = false;
        const updatedPerfil = await this.userPerfilRepository.save(perfil);
        const perfilDTO = UserPerfilDTO.fromEntity(updatedPerfil);
        return perfilDTO;
    }

    async convertDTOtoEntity(dto: UserPerfilDTO): Promise<UsuarioPerfil>{
        let e = new UsuarioPerfil();
        e.idPerfil = dto.getId();
        e.descricao = dto.getDescription();
        e.ativo = dto.getIsActive();
        return e;
    }
}