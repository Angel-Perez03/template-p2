import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class PonenteDto {
  @IsInt()
  @IsOptional()
  cedula?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  tipoPonente?: string; // "Interno" | "Invitado"

  @IsString()
  @IsOptional()
  especialidad?: string;
}
