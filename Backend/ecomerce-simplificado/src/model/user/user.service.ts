import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/entity/usuario.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { UserPerfilService } from "./perfil/userPerfil.service";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(Usuario) 
        private userRepository: Repository<Usuario>,
        private userPerfilService: UserPerfilService
    ){}

    async findAll(): Promise<UserDTO[]>{
        const users = await this.userRepository.find({ relations: ['usuarioPerfil'] });
        if (!users || users.length === 0) {throw new NotFoundException('No users found')}
        return Promise.all(users.map(user => this.convertEntitytoDTO(user)));
    }

    async findById(id: number): Promise<UserDTO>{
        const user = await this.userRepository.findOne({ relations: ['usuarioPerfil'], where: { idUsuario: id } });
        if (!user) {throw new NotFoundException('')}
        return this.convertEntitytoDTO(user);
    }

    async create(userDTO: UserDTO): Promise<UserDTO>{
        const e = await this.convertDTOtoEntity(userDTO);
        const newUser = await this.userRepository.save(e);
        return await this.findById(newUser.idUsuario);
    }

    async update(userDTO: UserDTO): Promise<UserDTO>{
        const e = await this.convertDTOtoEntity(userDTO);
        const updatedUser = await this.userRepository.save(e);
        return await this.findById(updatedUser.idUsuario);
    }

    async disable(id: number): Promise<UserDTO>{
        const userDto = await this.findById(id);
        if (!userDto) {throw new NotFoundException('DEU RUIM AQUI?' + userDto)}
        userDto.setIsActive(false);

        const usuario = await this.convertDTOtoEntity(userDto);
        const updatedUser = await this.userRepository.save(usuario);
        return await this.findById(updatedUser.idUsuario);
    }

    async convertEntitytoDTO(e: Usuario): Promise<UserDTO>{
        return new UserDTO(e.idUsuario,
                           e.nome,
                           e.rua,
                           e.numeroRua,
                           e.email,
                           e.senha,
                           e.cpf,
                           e.cnpj,
                           e.telefone,
                           e.celular,
                           e.usuarioPerfil,
                           e.ativo)
    }

    async convertDTOtoEntity(dto: UserDTO): Promise<Usuario>{
        let e = new Usuario();
        e.idUsuario = dto.getId();
        e.nome = dto.getName();
        e.rua = dto.getStreet();
        e.numeroRua = dto.getStreetNumber();
        e.email = dto.getEmail();
        e.senha = dto.getPassword();
        e.cpf = dto.getCpf();
        e.cnpj = dto.getCnpj();
        e.telefone = dto.getTelephone();
        e.celular = dto.getCellPhone();
        e.usuarioPerfil = dto.getId();
        e.ativo = dto.getIsActive();
        return e;
    }
}