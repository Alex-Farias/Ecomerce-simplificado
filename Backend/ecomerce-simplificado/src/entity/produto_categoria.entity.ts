import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('produto_categoria')
export class ProdutoCategoria {
  @PrimaryGeneratedColumn('increment', { name: 'id_produto_categoria' })
  idProdutoCategoria: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  descricao: string;
  @Column({ type: 'boolean', nullable: false, default: true })
  ativo: boolean;
}
