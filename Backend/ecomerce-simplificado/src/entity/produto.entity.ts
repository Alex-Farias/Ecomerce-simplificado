import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoCategoria } from './produto_categoria.entity';
import { Usuario } from './usuario.entity';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn('increment', {name: 'id_produto'})
  idProduto: number;

  @Column({ name: 'id_produto_categoria', type: 'int', nullable: false })
  idProdutoCategoria: number;

  @Column({ name: 'id_usuario', type: 'int', nullable: false })
  idUsuario: number;

  @ManyToOne(() => ProdutoCategoria, { nullable: false })
  @JoinColumn({ name: 'id_produto_categoria' })
  produtoCategoria: number;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'jsonb', nullable: false })
  descricao: any;

  @Column({ type: 'varchar', length: 50, nullable: false })
  unidade: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  ativo: boolean;
}
