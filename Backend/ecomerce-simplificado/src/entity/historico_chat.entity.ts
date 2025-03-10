import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BatePapo } from './chat.entity';

@Entity('historico_bate_papo')
export class BatePapoHistorico {
  @PrimaryGeneratedColumn('increment', { name: 'id_chat_historico' })
  idBatePapoHistorico: number;
  @ManyToOne(() => BatePapo, { nullable: false })
  @JoinColumn({ name: 'id_bate_papo' })
  batePapo: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  mensagem: string;
  @Column({ type: 'int', nullable: true })
  resposta: number;
  @Column({ type: 'boolean', nullable: false, default: false })
  favorita: boolean;
  @Column({ type: 'bytea', nullable: true })
  midia: Buffer;
}
