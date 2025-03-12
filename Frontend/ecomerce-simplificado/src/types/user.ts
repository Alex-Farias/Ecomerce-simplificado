// src/types/user.ts
export interface UserProfile {
  idPerfil: number;
  descricao: string;
  ativo: boolean;
}

export interface User {
  idUsuario: number;
  nome: string;
  rua: string;
  numeroRua: number;
  email: string;
  senha: string;
  cpf?: string;
  cnpj?: string;
  telefone?: string;
  celular: string;
  usuarioPerfil: number;
  ativo: boolean;
}