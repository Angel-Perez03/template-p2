import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AuditorioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  capacidad?: number;

  @IsString()
  @IsOptional()
  ubicacion?: string;
}
