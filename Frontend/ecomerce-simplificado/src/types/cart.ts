// src/types/cart.ts
export interface Cart {
    idCarrinho: number;
    usuario: number;
    items?: CartItem[];
}

export interface CartItem {
    idCarrinhoItem: number;
    carrinho: number;
    produto: number;
    produtoQuantidade: number;
    selecionado: boolean;
}