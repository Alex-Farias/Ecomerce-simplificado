import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn('increment', { name: 'id_pedido' })
  idPedido: number;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: number;
}
