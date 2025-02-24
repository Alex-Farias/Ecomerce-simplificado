import { UserPerfil } from "./userPerfil";

export interface User{
    id: number;
    name: string;
    street: string;
    streetName: string;
    email: string;
    password: string;
    cpf: string;
    cnpj: string;
    telephone: string;
    cellPhone: string;
    perfil: UserPerfil[];
    isActive: boolean;
}