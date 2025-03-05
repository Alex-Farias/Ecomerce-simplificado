import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('carrinho')
export class Carrinho {
  @PrimaryGeneratedColumn('increment', { name: 'id_carrinho' })
  idCarrinho: number;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: number;
}
