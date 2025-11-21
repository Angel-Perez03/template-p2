import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteModule } from './ponente/ponente.module';
import { EventoModule } from './evento/evento.module';
import { AsistenteModule } from './asistente/asistente.module';
import { AuditorioModule } from './auditorio/auditorio.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',   //use sqlite, debido a que no tenia instalado postgres
      database: 'eventos.db',
      autoLoadEntities: true,
      synchronize: true, // SOLO EN DESARROLLO
    }),
    PonenteModule,
    EventoModule,
    AsistenteModule,
    AuditorioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
