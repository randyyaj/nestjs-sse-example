import { Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

export enum EventType {
  FORM_UPDATED = 'form.updated',
}

@Injectable()
export class FormEventService {
  public serviceSubject$: Subject<any>;

  constructor(private eventEmitter: EventEmitter2) {
    this.serviceSubject$ = new Subject<any>();
  }

  emit(eventName: EventType, data: any): void {
    this.eventEmitter.emit(eventName, data);
  }

  @OnEvent(EventType.FORM_UPDATED)
  handleFormUpdatedEvent(data: any) {
    this.serviceSubject$.next(data);
  }
}