import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorio } from './auditorio.entity/auditorio.entity';
import { AuditorioDto } from './auditorio.dto';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  async crearAuditorio(dto: AuditorioDto): Promise<Auditorio> {
    const { nombre, capacidad, ubicacion } = dto;

    if (nombre == null || capacidad == null || ubicacion == null) {
      throw new BadRequestException(
        'nombre, capacidad y ubicacion son obligatorios',
      );
    }

    if (capacidad <= 0) {
      throw new BadRequestException(
        'La capacidad debe ser mayor a cero',
      );
    }

    const auditorio = this.auditorioRepo.create({
      nombre,
      capacidad,
      ubicacion,
    });

    return this.auditorioRepo.save(auditorio);
  }

  async findAll(): Promise<Auditorio[]> {
    return this.auditorioRepo.find();
  }

  async findById(id: number): Promise<Auditorio> {
    const auditorio = await this.auditorioRepo.findOne({ where: { id } });
    if (!auditorio) {
      throw new NotFoundException('Auditorio no encontrado');
    }
    return auditorio;
  }
}
