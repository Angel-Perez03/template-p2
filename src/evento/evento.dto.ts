import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class EventoDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  // Se envía como string ISO, se parsea a Date en el servicio
  @IsString()
  @IsOptional()
  fecha?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  duracionHoras?: number;

  @IsString()
  @IsOptional()
  estado?: string; // "Propuesto" | "Aprobado" | "Rechazado"

  @IsInt()
  @IsOptional()
  ponenteId?: number;

  @IsInt()
  @IsOptional()
  auditorioId?: number;
}
