import { Body, Controller, Post, Sse } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClientTypeEnum } from './client-type.enum';
import { UserRequestDto } from './user';
import { FormEventService, EventType } from './form-event.service';

@Controller()
export class AppController {
  constructor(private eventService: FormEventService) {}

  @Sse('sse')
  sse(): Observable<any> {
    return this.eventService.serviceSubject$.pipe(
      map((userRequestBody: UserRequestDto) => ({
        data: {
          message: 'Form was updated',
          subject: ClientTypeEnum.ADMIN, // determines who this message should be read by
          metadata: userRequestBody,
        },
      })),
    );
  }

  @Post()
  async submitForm(@Body() userRequestBody: UserRequestDto): Promise<void> {
    await this.eventService.emit(EventType.FORM_UPDATED, userRequestBody);
  }
}