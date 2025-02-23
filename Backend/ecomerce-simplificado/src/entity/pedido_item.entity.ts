import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from './produto.entity';

@Entity('pedido_item')
export class PedidoItem {
  @PrimaryGeneratedColumn('increment', { name: 'id_pedido_item' })
  idPedidoItem: number;
  @ManyToOne(() => Pedido, { nullable: false })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;
  @ManyToOne(() => Produto, { nullable: false })
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
  @Column({ type: 'int', nullable: false })
  produtoQuantidade: number;
  @Column({ type: 'boolean', nullable: false, default: true })
  ativo: boolean;
}
