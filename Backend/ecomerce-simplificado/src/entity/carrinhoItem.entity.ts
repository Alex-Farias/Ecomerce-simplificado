import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Carrinho } from './carrinho.entity';
import { Produto } from './produto.entity';

@Entity('carrinho_item')
export class CarrinhoItem {
  @PrimaryGeneratedColumn('increment', { name: 'id_carrinho_item' })
  idCarrinhoItem: number;
  @ManyToOne(() => Carrinho, { nullable: false })
  @JoinColumn({ name: 'id_carrinho' })
  carrinho: number;
  @ManyToOne(() => Produto, { nullable: false })
  @JoinColumn({ name: 'id_produto' })
  produto: number;
  @Column({ type: 'int', nullable: false })
  produtoQuantidade: number;
  @Column({ type: 'boolean', nullable: false, default: true })
  selecionado: boolean;
}
