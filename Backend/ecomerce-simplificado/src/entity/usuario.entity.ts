import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioPerfil } from "./usuario_perfil.entity";

@Entity('usuario')
export class Usuario{
    @PrimaryGeneratedColumn('increment', {name: 'id_usuario'})
    idUsuario: number;
    @Column({ type: 'varchar', length: 255, nullable: false })
    nome: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    rua: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    numeroRua: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    senha: string;
    @Column({ type: 'varchar', length: 14, nullable: true })
    cpf: string;
    @Column({ type: 'varchar', length: 18, nullable: true })
    cnpj: string;
    @Column({ type: 'varchar', length: 20, nullable: true })
    telefone: string;
    @Column({ type: 'varchar', length: 20, nullable: false })
    celular: string;
    @ManyToOne(() => UsuarioPerfil, { nullable: false })
    @JoinColumn({ name: 'id_perfil' })
    usuarioPerfil: UsuarioPerfil;
    @Column({ type: 'boolean', nullable: false, default: true })
    ativo: boolean;
}