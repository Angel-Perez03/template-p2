import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ponente } from '../../ponente/ponente.entity/ponente.entity';
import { Auditorio } from '../../auditorio/auditorio.entity/auditorio.entity';
import { Asistente } from '../../asistente/asistente.entity/asistente.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({ type: 'int' })
  duracionHoras: number;

  @Column()
  estado: string; // "Propuesto" | "Aprobado" | "Rechazado"

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos, { eager: true })
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos, {
    nullable: true,
    eager: true,
  })
  auditorio: Auditorio | null;

  @ManyToMany(() => Asistente, (asistente) => asistente.eventos, {
    cascade: true,
  })
  @JoinTable()
  asistentes: Asistente[];
}
