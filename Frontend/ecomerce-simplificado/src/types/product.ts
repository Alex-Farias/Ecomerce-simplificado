// src/types/product.ts
export interface ProductCategory {
  idProdutoCategoria: number;
  descricao: string;
  ativo: boolean;
}

export interface Product {
  idProduto: number;
  produtoCategoria: number;
  usuario: number;
  titulo: string;
  descricao: any; // JSON object
  unidade: string;
  preco: number;
  ativo: boolean;
}