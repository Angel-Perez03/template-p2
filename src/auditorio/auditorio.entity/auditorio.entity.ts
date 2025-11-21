import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evento } from '../../evento/evento.entity/evento.entity';

@Entity()
export class Auditorio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'int' })
  capacidad: number;

  @Column()
  ubicacion: string;

  @OneToMany(() => Evento, (evento) => evento.auditorio)
  eventos: Evento[];
}
