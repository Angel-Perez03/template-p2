import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoDto } from './evento.dto';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  create(@Body() dto: EventoDto) {
    return this.eventoService.crearEvento(dto);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.findEventoById(id);
  }

  @Patch(':id/aprobar')
  aprobar(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.aprobarEvento(id);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.eliminarEvento(id);
  }
}
