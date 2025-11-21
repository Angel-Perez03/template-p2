import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity/evento.entity';
import { Ponente } from '../ponente/ponente.entity/ponente.entity';
import { Auditorio } from '../auditorio/auditorio.entity/auditorio.entity';
import { EventoDto } from './evento.dto';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  //validations in crearEvento
  async crearEvento(dto: EventoDto): Promise<Evento> {
    const {
      titulo,
      descripcion,
      fecha,
      duracionHoras,
      estado,
      ponenteId,
      auditorioId,
    } = dto;

    if (
      titulo == null ||
      descripcion == null ||
      fecha == null ||
      duracionHoras == null ||
      ponenteId == null
    ) {
      throw new BadRequestException(
        'titulo, descripcion, fecha, duracionHoras y ponenteId son obligatorios',
      );
    }

    if (duracionHoras <= 0) {
      throw new BadRequestException(
        'La duración debe ser positiva',
      );
    }

    const fechaDate = new Date(fecha);
    if (isNaN(fechaDate.getTime())) {
      throw new BadRequestException('La fecha no es válida');
    }

    const ponente = await this.ponenteRepo.findOne({
      where: { id: ponenteId },
    });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    if (
      ponente.tipoPonente === 'Invitado' &&
      descripcion.length < 50
    ) {
      throw new BadRequestException(
        'Si el ponente es Invitado, la descripción debe tener al menos 50 caracteres',
      );
    }

    let auditorio: Auditorio | null = null;
    if (auditorioId != null) {
      auditorio = await this.auditorioRepo.findOne({
        where: { id: auditorioId },
      });
      if (!auditorio) {
        throw new NotFoundException('Auditorio no encontrado');
      }
    }

    const evento = this.eventoRepo.create({
      titulo,
      descripcion,
      fecha: fechaDate,
      duracionHoras,
      estado: estado ?? 'Propuesto',
      ponente,
      auditorio: auditorio ?? null,
    });

    return this.eventoRepo.save(evento);
  }

  async findEventoById(id: number): Promise<Evento> {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ['asistentes'],
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    return evento;
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoRepo.find({
      relations: ['asistentes'],
    });
  }

  // aprobarEvento(id):
  async aprobarEvento(id: number): Promise<Evento> {
    const evento = await this.findEventoById(id);

    if (!evento.auditorio) {
      throw new BadRequestException(
        'Solo se puede aprobar un evento con auditorio asignado',
      );
    }

    if (evento.estado === 'Aprobado') {
      throw new BadRequestException('El evento ya está aprobado');
    }

    evento.estado = 'Aprobado';
    return this.eventoRepo.save(evento);
  }

    // eliminarEvento(id):
  async eliminarEvento(id: number): Promise<void> {
    const evento = await this.findEventoById(id);

    if (evento.estado === 'Aprobado') {
      throw new BadRequestException(
        'No se puede eliminar un evento aprobado',
      );
    }

    await this.eventoRepo.remove(evento);
  }
}
