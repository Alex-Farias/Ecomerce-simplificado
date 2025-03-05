import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn('increment', { name: 'id_chat' })
  idChat: number;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario1' })
  usuario1: number;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario2' })
  usuario2: number;
  @Column({ type: 'varchar', length: 255, nullable: true })
  descricao: string;
}
