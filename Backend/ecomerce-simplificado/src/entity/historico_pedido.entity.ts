import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { PedidoItem } from './pedido_item.entity';
import { Produto } from './produto.entity';
import { Usuario } from './usuario.entity';
import { Pedido } from './pedido.entity';

@Entity('historico_pedido')
export class PedidoHistorico {
  @PrimaryGeneratedColumn('increment', { name: 'id_pedido_historico' })
  idPedidoHistorico: number;
  @ManyToOne(() => PedidoItem, { nullable: false })
  @JoinColumn({ name: 'id_pedido_item' })
  pedidoItem: PedidoItem;
  @ManyToOne(() => Pedido, { nullable: false })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;
  @ManyToOne(() => Produto, { nullable: false })
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
  @Column({ type: 'int', nullable: false })
  produtoQuantidade: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valorTotal: number;
  @Column({ type: 'boolean', nullable: false, default: true })
  ativo: boolean;
  @Column({ type: 'timestamp', nullable: false })
  dataAlteracao: Date;
}
