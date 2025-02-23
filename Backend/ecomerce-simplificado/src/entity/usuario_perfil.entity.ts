import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario_perfil')
export class UsuarioPerfil{
    @PrimaryGeneratedColumn('increment', { name: 'id_perfil' })
    idPerfil: number;
    @Column({ type: 'varchar', length: 255, nullable: false })
    descricao: string;
    @Column({ type: 'boolean', nullable: false, default: true })
    ativo: boolean;
}