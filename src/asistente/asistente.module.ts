import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistente } from './asistente.entity/asistente.entity';
import { Evento } from '../evento/evento.entity/evento.entity';
import { AsistenteService } from './asistente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asistente, Evento])],
  controllers: [],
  providers: [AsistenteService],
  exports: [AsistenteService],
})
export class AsistenteModule {}
