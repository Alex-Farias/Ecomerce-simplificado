import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/entity/usuario.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { UserPerfilService } from "./perfil/userPerfil.service";
import { ConvertClass } from "src/config/convertClassesEnum";
import { User } from "./user";

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
        return Promise.all(users.map(user => this.convert(user, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<UserDTO>{
        const user = await this.userRepository.findOne({ where: { idUsuario: id }, relations: ['usuarioPerfil'] });
        if (!user) {throw new NotFoundException('')}
        return this.convert(user, ConvertClass.DTO);
    }

    async create(userDTO: UserDTO): Promise<UserDTO>{
        const e = await this.convert(userDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cUser = await this.userRepository.save(e);
        return await this.findById(cUser.idUsuario);
    }

    async update(userDTO: UserDTO): Promise<UserDTO>{
        const e = await this.convert(userDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uUser = await this.userRepository.save(e);
        return await this.findById(uUser.idUsuario);
    }

    async disable(id: number): Promise<UserDTO>{
        const userDTO = await this.findById(id);
        if (!userDTO) {throw new NotFoundException('DEU RUIM AQUI?' + userDTO)}
        userDTO.setIsActive(false);

        const e = await this.convert(userDTO, ConvertClass.ENTITY);
        const uUser = await this.userRepository.save(e);
        return await this.findById(uUser.idUsuario);
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof Usuario) {return obj}
                if(obj instanceof User || obj instanceof UserDTO){
                    let user = new Usuario()
                    user.idUsuario = obj.getId();
                    user.nome = obj.getName();
                    user.rua = obj.getStreet();
                    user.numeroRua = obj.getStreetNumber();
                    user.email = obj.getEmail();
                    user.senha = obj.getPassword();
                    user.cpf = obj.getCpf();
                    user.cnpj = obj.getCnpj();
                    user.telefone = obj.getTelephone();
                    user.celular = obj.getCellPhone();
                    user.usuarioPerfil = obj.getPerfil();
                    user.ativo = obj.getIsActive();
                    return user;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof Usuario){
                    const perfil = await this.userPerfilService.convert(
                        await this.userPerfilService.findById(obj.idUsuario), convertTo);

                    return new User(
                        obj.idUsuario,
                        obj.nome,
                        obj.rua,
                        obj.numeroRua,
                        obj.email,
                        obj.senha,
                        obj.cpf,
                        obj.cnpj,
                        obj.telefone,
                        obj.celular,
                        perfil,
                        obj.ativo,
                    );
                }

                if(obj instanceof UserDTO) {
                    return new User(
                        obj.getId(),
                        obj.getName(),
                        obj.getStreet(),
                        obj.getStreetNumber(),
                        obj.getEmail(),
                        obj.getPassword(),
                        obj.getCpf(),
                        obj.getCnpj(),
                        obj.getTelephone(),
                        obj.getCellPhone(),
                        obj.getPerfil(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof User){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof Usuario){
                    const perfil = await this.userPerfilService.convert(
                        await this.userPerfilService.findById(obj.idUsuario), convertTo);

                    return new User(
                        obj.idUsuario,
                        obj.nome,
                        obj.rua,
                        obj.numeroRua,
                        obj.email,
                        obj.senha,
                        obj.cpf,
                        obj.cnpj,
                        obj.telefone,
                        obj.celular,
                        perfil,
                        obj.ativo,
                    );
                }

                if(obj instanceof User){
                    return new UserDTO(
                        obj.getId(),
                        obj.getName(),
                        obj.getStreet(),
                        obj.getStreetNumber(),
                        obj.getEmail(),
                        obj.getPassword(),
                        obj.getCpf(),
                        obj.getCnpj(),
                        obj.getTelephone(),
                        obj.getCellPhone(),
                        obj.getPerfil(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof UserDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}