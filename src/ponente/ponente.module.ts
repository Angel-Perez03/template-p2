import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ponente } from './ponente.entity/ponente.entity';
import { PonenteService } from './ponente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ponente])],
  controllers: [],
  providers: [PonenteService],
  exports: [PonenteService],
})
export class PonenteModule {}
