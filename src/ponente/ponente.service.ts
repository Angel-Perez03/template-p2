import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponente } from './ponente.entity/ponente.entity';
import { PonenteDto } from './ponente.dto';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
  ) {}

  async crearPonente(dto: PonenteDto): Promise<Ponente> {
    const { cedula, nombre, email, tipoPonente, especialidad } = dto;

    if (
      cedula == null ||
      nombre == null ||
      email == null ||
      tipoPonente == null ||
      especialidad == null
    ) {
      throw new BadRequestException(
        'Todos los campos son obligatorios para crear un ponente',
      );
    }

    if (tipoPonente !== 'Interno' && tipoPonente !== 'Invitado') {
      throw new BadRequestException(
        'El tipoPonente debe ser "Interno" o "Invitado"',
      );
    }

    if (tipoPonente === 'Interno') {
      if (!email.endsWith('.edu')) {
        throw new BadRequestException(
          'Si el ponente es Interno, el email debe terminar en .edu',
        );
      }
    } else {
        //email validation 
      const atIndex = email.indexOf('@');
      const dotIndex = email.lastIndexOf('.');
      if (
        atIndex < 1 ||
        dotIndex <= atIndex + 1 ||
        dotIndex === email.length - 1
      ) {
        throw new BadRequestException(
          'Si el ponente es Invitado, el email debe ser válido',
        );
      }
    }

    const entity = this.ponenteRepo.create({
      cedula,nombre,email,
      tipoPonente,especialidad,
    });

    return this.ponenteRepo.save(entity);
  }

  async findPonenteById(id: number): Promise<Ponente> {
    const ponente = await this.ponenteRepo.findOne({
      where: { id },
    });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }
    return ponente;
  }

  async eliminarPonente(id: number): Promise<void> {
    const ponente = await this.ponenteRepo.findOne({
      where: { id },
      relations: ['eventos'],
    });

    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    const tieneEventos = (ponente.eventos ?? []).length > 0;
    if (tieneEventos) {
      throw new BadRequestException(
        'No se puede eliminar un ponente con eventos asociados',
      );
    }
    await this.ponenteRepo.remove(ponente);
  }

  async findAll(): Promise<Ponente[]> {
    return this.ponenteRepo.find();}
}
