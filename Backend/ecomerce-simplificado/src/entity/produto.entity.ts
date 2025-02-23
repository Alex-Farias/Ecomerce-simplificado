import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProdutoCategoria } from './produto_categoria.entity';
import { Usuario } from './usuario.entity';

@Entity('produto')
export class Produto {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  idProduto: string;
  @ManyToOne(() => ProdutoCategoria, { nullable: false })
  @JoinColumn({ name: 'id_produto_categoria' })
  produtoCategoria: ProdutoCategoria;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;
  @Column({ type: 'jsonb', nullable: false })
  descricao: any;
  @Column({ type: 'varchar', length: 50, nullable: false })
  unidade: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;
}
