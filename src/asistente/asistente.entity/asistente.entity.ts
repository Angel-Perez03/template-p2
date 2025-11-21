import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evento } from '../../evento/evento.entity/evento.entity';

@Entity()
export class Asistente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  email: string;

  @ManyToMany(() => Evento, (evento) => evento.asistentes)
  eventos: Evento[];
}
