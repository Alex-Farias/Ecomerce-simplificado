import { UserPerfilEnum } from "../perfil/enum/userPerfilEnum";

export interface UserInterface{
    id: number;
    name: string;
    street: string;
    streetNumber: number;
    email: string;
    password: string;
    cpf: string;
    cnpj: string;
    telephone: string;
    cellPhone: string;
    perfil: number;
    isActive: boolean;
}