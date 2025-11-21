import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from './asistente.entity/asistente.entity';
import { Evento } from '../evento/evento.entity/evento.entity';
import { AsistenteDto } from './asistente.dto';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepo: Repository<Asistente>,
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  // Registro
  async registrarAsistente(
    eventoId: number,
    dto: AsistenteDto,
  ): Promise<Asistente> {
    const { nombre, codigoEstudiante, email } = dto;

    if (nombre == null || codigoEstudiante == null || email == null) {
      throw new BadRequestException(
        'nombre, codigoEstudiante y email son obligatorios',
      );
    }

    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['asistentes', 'auditorio'],
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'El evento no tiene auditorio asignado',
      );
    }

    // No puede haber dos asistentes con el mismo email en el mismo evento
    const emailRepetido = (evento.asistentes ?? []).some(
      (a) => a.email === email,
    );
    if (emailRepetido) {
      throw new BadRequestException(
        'Ya existe un asistente con ese email en este evento',
      );
    }

    // No superar capacidad
    const capacidad = evento.auditorio.capacidad;
    const asistentesActuales = evento.asistentes?.length ?? 0;

    if (asistentesActuales >= capacidad) {
      throw new BadRequestException(
        'No se puede registrar más asistentes: capacidad del auditorio alcanzada',
      );
    }

    const asistente = this.asistenteRepo.create({
      nombre,
      codigoEstudiante,
      email,
    });

    await this.asistenteRepo.save(asistente);

    evento.asistentes = [...(evento.asistentes ?? []), asistente];
    await this.eventoRepo.save(evento);
    return asistente;
  }

  async findAsistentesByEvento(eventoId: number): Promise<Asistente[]> {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    return evento.asistentes ?? [];
  }
}
