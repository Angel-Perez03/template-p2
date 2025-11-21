import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditorio } from './auditorio.entity/auditorio.entity';
import { AuditorioService } from './auditorio.service';
import { AuditorioController } from './auditorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorio])],
  controllers: [AuditorioController],
  providers: [AuditorioService],
  exports: [AuditorioService],
})
export class AuditorioModule {}
