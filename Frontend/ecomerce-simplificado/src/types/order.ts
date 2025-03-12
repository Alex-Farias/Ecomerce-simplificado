// src/types/order.ts
export interface Order {
  idPedido: number;
  usuario: number;
  items?: OrderItem[];
}

export interface OrderItem {
  idPedidoItem: number;
  pedido: number;
  produto: number;
  produtoQuantidade: number;
  ativo: boolean;
}

export interface OrderHistory {
  idPedidoHistorico: number;
  pedidoItem: number;
  pedido: number;
  produto: number;
  usuario: number;
  produtoQuantidade: number;
  valorTotal: number;
  ativo: boolean;
  dataAlteracao: Date;
}