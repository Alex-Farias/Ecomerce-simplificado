import { IsString, IsInt, IsOptional, IsIn, IsBoolean, IsNotEmpty, IsEnum } from 'class-validator';
import { User } from 'src/model/user/user';
import { UserPerfil } from 'src/model/user/perfil/userPerfil';
import { UserPerfilEnum } from 'src/model/user/perfil/enum/userPerfilEnum';
import { Usuario } from 'src/entity/usuario.entity';
import { Transform } from 'class-transformer';

export class UserDTO{
  @IsOptional()
  @IsInt()
  id?: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  street: string;
  @IsInt()
  @IsNotEmpty()
  streetNumber: number;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  cpf: string;
  @IsString()
  cnpj: string;
  @IsString()
  telephone: string;
  @IsString()
  cellPhone: string;
  @IsInt()
  @IsNotEmpty()
  perfil: UserPerfilEnum;
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  constructor(id: number,
              name: string,
              street: string,
              streetNumber: number,
              email: string,
              password: string,
              cpf: string,
              cnpj: string,
              telephone: string,
              cellPhone: string,
              perfil: UserPerfilEnum,
              isActive: boolean)
  {
    //if (!id){throw new Error('O ID TA VINDO NULO?: ' + id + name + email + perfil)}

    this.id = id;
    this.name = name;
    this.street = street;
    this.streetNumber =streetNumber;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.cnpj = cnpj;
    this.telephone = telephone;
    this.cellPhone = cellPhone;
    this.perfil = perfil;
    this.isActive = isActive;
  }

  public static fromEntity(e: Usuario): UserDTO{
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

  public static fromClass(dto: User): UserDTO{
    return new UserDTO(dto.getId(),
                       dto.getName(),
                       dto.getStreet(),
                       dto.getStreetNumber(),
                       dto.getEmail(),
                       dto.getPassword(),
                       dto.getCpf(),
                       dto.getCnpj(),
                       dto.getTelephone(),
                       dto.getCellPhone(),
                       dto.getPerfil(),
                       dto.getIsActive())
  }

  public getId(): number{return this.id!}
  public getName(): string{return this.name!}
  public getStreet(): string{return this.street!}
  public getStreetNumber(): number{return this.streetNumber!}
  public getEmail(): string{return this.email!}
  public getPassword(): string{return this.password}
  public getCpf(): string{return this.cpf!}
  public getCnpj(): string{return this.cnpj!}
  public getTelephone(): string{return this.telephone!}
  public getCellPhone(): string{return this.cellPhone!}
  public getPerfil(): UserPerfilEnum{return this.perfil!}
  public getIsActive(): boolean{return this.isActive!}

  public setId(id: number){this.id = id}
  public setName(name: string){this.name = name}
  public setStreet(street: string){this.street = street}
  public setStreetNumber(streetNumber: number){this.streetNumber = streetNumber}
  public setEmail(email: string){this.email = email}
  public setPassword(password: string){this.password = password}
  public setCpf(cpf: string){this.cpf = cpf}
  public setCnpj(cnpj: string){this.cnpj = cnpj}
  public setTelephone(telephone: string){this.telephone = telephone}
  public setCellPhone(cellPhone: string){this.cellPhone = cellPhone}
  public setPerfil(perfil: UserPerfilEnum){this.perfil = perfil}
  public setIsActive(isActive: boolean){this.isActive = isActive}
}
