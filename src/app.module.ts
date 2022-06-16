import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FormEventService } from './form-event.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [FormEventService],
})
export class AppModule {}