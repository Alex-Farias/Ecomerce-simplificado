import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('bate_papo')
export class BatePapo {
  @PrimaryGeneratedColumn('increment', { name: 'id_bate_papo' })
  idBatePapo: number;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario1' })
  usuario1: number;
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario2' })
  usuario2: number;
  @Column({ type: 'varchar', length: 255, nullable: true })
  descricao: string;
  @Column({ type: 'boolean', nullable: false })
  ativo: boolean
}
