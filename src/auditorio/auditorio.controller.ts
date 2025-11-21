import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { AuditorioDto } from './auditorio.dto';

@Controller('auditorios')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  create(@Body() dto: AuditorioDto) {
    return this.auditorioService.crearAuditorio(dto);
  }

  @Get()
  findAll() {
    return this.auditorioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.auditorioService.findById(id);
  }
}
