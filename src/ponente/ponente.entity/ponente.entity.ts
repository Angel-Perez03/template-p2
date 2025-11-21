import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evento } from '../../evento/evento.entity/evento.entity';

@Entity()
export class Ponente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  tipoPonente: string; // "Interno" | "Invitado"

  @Column()
  especialidad: string;

  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
