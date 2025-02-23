import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Chat } from './chat.entity';

@Entity('historico_chat')
export class ChatHistorico {
  @PrimaryGeneratedColumn('increment', { name: 'id_chat_historico' })
  idChatHistorico: number;
  @ManyToOne(() => Chat, { nullable: false })
  @JoinColumn({ name: 'id_chat' })
  chat: Chat;
  @Column({ type: 'varchar', length: 255, nullable: false })
  mensagem: string;
  @Column({ type: 'int', nullable: true })
  resposta: number;
  @Column({ type: 'boolean', nullable: false, default: false })
  favorita: boolean;
  @Column({ type: 'bytea', nullable: true })
  midia: Buffer;
}
