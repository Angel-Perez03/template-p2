import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './evento.entity/evento.entity';
import { Ponente } from '../ponente/ponente.entity/ponente.entity';
import { Auditorio } from '../auditorio/auditorio.entity/auditorio.entity';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Ponente, Auditorio])],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}
