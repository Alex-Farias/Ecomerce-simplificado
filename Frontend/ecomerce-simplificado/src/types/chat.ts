// src/types/chat.ts
export interface Chat {
    idBatePapo: number;
    usuario1: number;
    usuario2: number;
    descricao?: string;
    ativo: boolean;
    messages?: ChatHistory[];
}

export interface ChatHistory {
    idBatePapoHistorico: number;
    batePapo: number;
    mensagem: string;
    resposta?: number;
    favorita: boolean;
    midia?: any; // binary data
}