import {
    IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class AsistenteDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    email?: string;
    
    @IsString()
    @IsOptional()
    codigoEstudiante?: string;

    @IsInt()
    @IsOptional()
    eventoId?: number;


}